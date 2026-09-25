import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

// 開発中はキャッシュが邪魔になるので本番ビルドだけ登録する
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // 登録できなくても通常のページとしては動く
        });
        // 初回訪問では JS/CSS が SW より先に読み込まれてキャッシュされないので、読み込み済みの分を渡す
        navigator.serviceWorker.ready.then((reg) => {
            const urls = performance
                .getEntriesByType('resource')
                .map((entry) => entry.name)
                .filter((url) => url.startsWith(location.origin) || url.includes('fonts.g'));
            reg.active?.postMessage({ type: 'cache-urls', urls });
        });
    });
}
