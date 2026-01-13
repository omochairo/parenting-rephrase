import React from 'react';
import { Heart, Lightbulb } from 'lucide-react';
import { RephraseItem } from '../types';

interface RephraseCardProps {
    item: RephraseItem;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

const RephraseCard: React.FC<RephraseCardProps> = ({
    item,
    isFavorite,
    onToggleFavorite,
}) => {
    return (
        <div className="rephrase-card">
            <div className="card-header">
                <span className="category-badge">{item.category}</span>
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(item.id)}
                    aria-label="お気に入り"
                >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="situation">{item.situation}</div>

            <div className="comparison">
                <div className="before-section">
                    <div className="label">言い換え前</div>
                    <div className="text before-text">「{item.before}」</div>
                </div>

                <div className="arrow">⬇︎</div>

                <div className="after-section-tabs">
                    <div className="tab-header">
                        <span className="tab-label empathy">💕 共感</span>
                        <span className="tab-label action">✨ 行動</span>
                        <span className="tab-label logic">💡 判断</span>
                    </div>
                    <div className="type-row empathy-row">
                        <span className="type-badge">キモチ</span>
                        <p className="after-text-multi">「{item.after.empathy}」</p>
                    </div>
                    <div className="type-row action-row">
                        <span className="type-badge">ヤル気</span>
                        <p className="after-text-multi">「{item.after.action}」</p>
                    </div>
                    <div className="type-row logic-row">
                        <span className="type-badge">ナットク</span>
                        <p className="after-text-multi">「{item.after.logic}」</p>
                    </div>
                </div>
            </div>

            <div className="reason">
                <Lightbulb size={16} className="reason-icon" />
                <span>{item.reason}</span>
            </div>

            <div className="tags">
                {item.tags.map((tag, index) => (
                    <span key={index} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="share-section">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `「${item.before}」の言い換え！\n💕共感: ${item.after.empathy}\n✨行動: ${item.after.action}\n#育児の言い換え`
                    )}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn x-share"
                    aria-label="Xでシェア"
                >
                    𝕏 でシェア
                </a>
                <a
                    href={`https://www.threads.net/intent/post?text=${encodeURIComponent(
                        `「${item.before}」の言い換え！\n💕共感: ${item.after.empathy}\n✨行動: ${item.after.action}\n#育児の言い換え ${window.location.href}`
                    )}`}
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
