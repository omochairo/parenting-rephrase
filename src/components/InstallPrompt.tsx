import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const InstallPrompt: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // check if already dismissed
        const dismissed = localStorage.getItem('install-prompt-dismissed');
        if (!dismissed) {
            // Show after a short delay
            const timer = setTimeout(() => setIsVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('install-prompt-dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="install-prompt">
            <div className="install-content">
                <p>
                    <strong>ホーム画面に追加</strong>して、<br />
                    焦った時にすぐ使えるようにしませんか？
                </p>
                <button className="close-prompt" onClick={handleDismiss} aria-label="閉じる">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default InstallPrompt;
