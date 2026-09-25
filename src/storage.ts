// localStorage は Safari のプライベートモードや容量超過で例外を投げる。
// 壊れた JSON が入っていても画面が真っ白にならないよう、ここで握りつぶす
export function loadJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
        return fallback;
    }
}

export function saveJSON(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // 保存できなくてもアプリは使えるので無視する
    }
}
