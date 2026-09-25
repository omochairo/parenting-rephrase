// オフラインでも開けるようにする最小限の Service Worker。
// 電波の悪い場所（地下・病院の待合など）で困る場面が多いため。
// キャッシュ構成を変えたら CACHE の版を上げること
const CACHE = 'rephrase-v1';
const PRECACHE = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ページ側から「読み込み済みのファイル」を受け取ってキャッシュする（初回訪問からオフラインで使えるように）。
// 同時に、今のページが使っていない古いビルドの /assets/ を消す（デプロイのたびに溜まらないように）
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache-urls' || !Array.isArray(event.data.urls)) return;
  const urls = event.data.urls;
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await Promise.all(
        urls.map((url) => cache.match(url).then((hit) => hit || cache.add(url).catch(() => undefined)))
      );
      const current = new Set(urls);
      const keys = await cache.keys();
      await Promise.all(
        keys
          .filter((req) => new URL(req.url).pathname.startsWith('/assets/') && !current.has(req.url))
          .map((req) => cache.delete(req))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // ページ本体は最新を優先し、オフライン時だけキャッシュを返す（新しいビルドを取り逃さないため）
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // エラーページやリダイレクト先を「オフライン用の本体」として保存しない
          if (res.ok && !res.redirected) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put('/', copy));
          }
          return res;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // ビルド成果物（ファイル名にハッシュ付き）・アイコン・Google Fonts はキャッシュ優先
  const cacheable =
    url.origin === self.location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;

  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});
