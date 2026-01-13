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

                <div className="arrow">→</div>

                <div className="after-section">
                    <div className="label">言い換え後</div>
                    <div className="text after-text">「{item.after}」</div>
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
        </div>
    );
};

export default RephraseCard;
