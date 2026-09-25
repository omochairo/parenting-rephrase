import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { rephraseGroups } from '../data';

interface SosModalProps {
    onClose: () => void;
    onMarkUsed: () => void;
}

// 焦っている・イライラしている時に出番が多い場面だけを並べる（褒める場面は困りごとではないので除く）
const urgentGroups = rephraseGroups.filter(
    (g) => g.category !== '褒める場面' && g.moods.some((m) => m === 'イライラ' || m === '急いでる')
);

const SosModal: React.FC<SosModalProps> = ({ onClose, onMarkUsed }) => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [used, setUsed] = useState(false);

    const selected = useMemo(
        () => urgentGroups.find((g) => g.key === selectedKey) ?? null,
        [selectedKey]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content sos-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sos-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="閉じる">
                    <X size={24} />
                </button>

                <div className="breath">
                    <div className="breath-circle" aria-hidden="true" />
                    <p className="breath-text" id="sos-title">
                        まず、ひと呼吸。<br />
                        <span>4秒吸って、6秒かけて吐いてみましょう</span>
                    </p>
                </div>

                {selected ? (
                    <div className="sos-answer">
                        <p className="sos-situation">{selected.situation}</p>
                        <p className="sos-phrase empathy">💕 {selected.after.empathy}</p>
                        <p className="sos-phrase action">✨ {selected.after.action}</p>
                        <p className="sos-phrase logic">💡 {selected.after.logic}</p>
                        <div className="sos-actions">
                            <button className="close-btn secondary" onClick={() => {
                                    setSelectedKey(null);
                                    setUsed(false);
                                }}>
                                別の場面
                            </button>
                            <button
                                className="close-btn"
                                disabled={used}
                                onClick={() => {
                                    onMarkUsed();
                                    setUsed(true);
                                }}
                            >
                                {used ? 'えらい！記録しました' : '今日使えた！'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="sos-prompt">いま、どんな場面ですか？</p>
                        <div className="sos-chips">
                            {urgentGroups.map((g) => (
                                <button key={g.key} className="sos-chip" onClick={() => setSelectedKey(g.key)}>
                                    {g.situation}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SosModal;
