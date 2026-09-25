import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { loadJSON, saveJSON } from '../storage';

const DISMISSED_KEY = 'install-prompt-dismissed';

// Chrome / Edge / Android が出す beforeinstallprompt（標準の型定義に無い）
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone(): boolean {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        // iOS Safari のホーム画面起動
        (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
}

function isIOS(): boolean {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
        // iPadOS 13+ は Mac の UA を名乗る
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

const InstallPrompt: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
    const [ios] = useState(isIOS);

    useEffect(() => {
        // すでにホーム画面から開いている・一度閉じた人には出さない
        if (isStandalone() || loadJSON(DISMISSED_KEY, false)) return;

        const onBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferred(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };
        window.addEventListener('beforeinstallprompt', onBeforeInstall);

        // iOS はインストール API が無いので、手順の案内だけを少し遅れて出す
        const timer = ios ? window.setTimeout(() => setIsVisible(true), 3000) : undefined;
        return () => {
            window.removeEventListener('beforeinstallprompt', onBeforeInstall);
            window.clearTimeout(timer);
        };
    }, [ios]);

    const handleDismiss = () => {
        setIsVisible(false);
        saveJSON(DISMISSED_KEY, true);
    };

    const handleInstall = async () => {
        if (!deferred) return;
        await deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
        setIsVisible(false);
        // 追加した人にも断った人にも、次からは出さない
        saveJSON(DISMISSED_KEY, true);
    };

    if (!isVisible) return null;

    return (
        <div className="install-prompt" role="dialog" aria-label="ホーム画面に追加">
            <div className="install-content">
                <p>
                    <strong>ホーム画面に追加</strong>して、<br />
                    焦った時にすぐ使えるようにしませんか？
                    {ios && !deferred && (
                        <span className="install-hint">
                            下の共有ボタン <span aria-hidden="true">⬆︎</span> →「ホーム画面に追加」
                        </span>
                    )}
                </p>
                {deferred && (
                    <button className="install-btn" onClick={handleInstall}>
                        追加する
                    </button>
                )}
                <button className="close-prompt" onClick={handleDismiss} aria-label="閉じる">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default InstallPrompt;
