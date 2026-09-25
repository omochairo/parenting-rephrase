import React, { useState } from 'react';
import { Heart, Lightbulb, Copy, Check, Share2, PartyPopper } from 'lucide-react';
import { RephraseGroup } from '../types';

interface RephraseCardProps {
    item: RephraseGroup;
    isFavorite: boolean;
    onToggleFavorite: (key: string) => void;
    onMarkUsed: () => void;
    // 検索でヒットした「言い換え前」。あれば先頭に強調して出す
    matchedBefore?: string;
}

const types = [
    { key: 'empathy', badge: 'キモチ' },
    { key: 'action', badge: 'ヤル気' },
    { key: 'logic', badge: 'ナットク' },
] as const;

const MAX_BEFORES = 3;

async function copyText(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // http 配信や古いブラウザでは clipboard API が使えない
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    }
}

const RephraseCard: React.FC<RephraseCardProps> = ({
    item,
    isFavorite,
    onToggleFavorite,
    onMarkUsed,
    matchedBefore,
}) => {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [justUsed, setJustUsed] = useState(false);
    const [showAllBefores, setShowAllBefores] = useState(false);

    const primaryBefore = matchedBefore ?? item.befores[0];
    const otherBefores = item.befores.filter((b) => b !== primaryBefore);
    const visibleOthers = showAllBefores ? otherBefores : otherBefores.slice(0, MAX_BEFORES);

    const handleCopy = async (key: string, text: string) => {
        if (await copyText(text)) {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey((cur) => (cur === key ? null : cur)), 1500);
        }
    };

    const shareText =
        `「${primaryBefore}」の言い換え\n` +
        `💕共感: ${item.after.empathy}\n` +
        `✨行動: ${item.after.action}\n` +
        `💡論理: ${item.after.logic}\n` +
        `#育児の言い換え`;
    const shareUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(item.situation)}`;
    const canNativeShare = typeof navigator.share === 'function';

    const handleNativeShare = async () => {
        try {
            await navigator.share({ text: shareText, url: shareUrl });
        } catch {
            // キャンセル時も reject されるので何もしない
        }
    };

    return (
        <div className="rephrase-card">
            <div className="card-header">
                <span className="category-badge">{item.category}</span>
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(item.key)}
                    aria-label={isFavorite ? 'お気に入りから外す' : 'お気に入りに追加'}
                    aria-pressed={isFavorite}
                >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="situation">{item.situation}</div>

            <div className="comparison">
                <div className="before-section">
                    <div className="label">言い換え前</div>
                    <div className="text before-text">「{primaryBefore}」</div>
                    {otherBefores.length > 0 && (
                        <div className="before-variants">
                            <span className="variants-label">こんな言い方も:</span>
                            {visibleOthers.map((b) => (
                                <span key={b} className="variant-chip">{b}</span>
                            ))}
                            {otherBefores.length > MAX_BEFORES && (
                                <button
                                    className="variants-more"
                                    onClick={() => setShowAllBefores(!showAllBefores)}
                                >
                                    {showAllBefores ? '閉じる' : `他${otherBefores.length - MAX_BEFORES}件`}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="arrow">⬇︎</div>

                <div className="after-section-tabs">
                    {types.map((t) => {
                        const text = item.after[t.key];
                        const copied = copiedKey === t.key;
                        return (
                            <button
                                key={t.key}
                                className={`type-row ${t.key}-row copyable`}
                                onClick={() => handleCopy(t.key, text)}
                                aria-label={`${t.badge}の言い換えをコピー: ${text}`}
                            >
                                <span className="type-badge">{t.badge}</span>
                                <span className="after-text-multi">「{text}」</span>
                                <span className={`copy-icon ${copied ? 'copied' : ''}`} aria-hidden="true">
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </span>
                            </button>
                        );
                    })}
                    <p className="copy-hint" aria-live="polite">
                        {copiedKey ? 'コピーしました' : 'タップでコピーできます'}
                    </p>
                </div>
            </div>

            <div className="reason">
                <Lightbulb size={16} className="reason-icon" />
                <span>{item.reason}</span>
            </div>

            <div className="tags">
                {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>

            <button
                className={`used-btn ${justUsed ? 'done' : ''}`}
                onClick={() => {
                    onMarkUsed();
                    setJustUsed(true);
                    setTimeout(() => setJustUsed(false), 2000);
                }}
            >
                <PartyPopper size={16} />
                {justUsed ? 'えらい！記録しました' : '今日使えた！'}
            </button>

            <div className="share-section">
                {canNativeShare && (
                    <button className="share-btn native-share" onClick={handleNativeShare}>
                        <Share2 size={14} /> 共有
                    </button>
                )}
                <a
                    href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn line-share"
                    aria-label="LINEで送る"
                >
                    LINE
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn x-share"
                    aria-label="Xでシェア"
                >
                    𝕏
                </a>
                <a
                    href={`https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn threads-share"
                    aria-label="Threadsでシェア"
                >
                    Threads
                </a>
            </div>
        </div>
    );
};

export default RephraseCard;
