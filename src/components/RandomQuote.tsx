import React, { useState, useEffect } from 'react';
import { RephraseItem } from '../types';
import { allRephraseData } from '../data';
import './RandomQuote.css';

const RandomQuote: React.FC = () => {
    const [quote, setQuote] = useState<RephraseItem | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomQuote = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * allRephraseData.length);
            setQuote(allRephraseData[randomIndex]);
            setIsAnimating(false);
        }, 300);
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    if (!quote) return null;

    return (
        <div className="random-quote-container">
            <h2 className="random-quote-title">
                <span className="icon">🍀</span> 今日のひとこと
            </h2>
            <div className={`random-quote-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="quote-situation">場面：{quote.situation}</div>
                <div className="quote-content">
                    <div className="quote-before">
                        <span className="cross-icon">✕</span> {quote.before}
                    </div>
                </div>
                <div className="quote-arrow">⬇︎</div>
                <div className="quote-after">
                    <div className="quote-type">💕 共感: {quote.after.empathy}</div>
                    <div className="quote-type">✨ 行動: {quote.after.action}</div>
                    <div className="quote-type">💡 判断: {quote.after.logic}</div>
                </div>
            </div>
            <p className="quote-reason">💡 {quote.reason}</p>
            <button className="refresh-btn" onClick={getRandomQuote} aria-label="別の言葉を見る">
                🔄 別の言葉を見る
            </button>
        </div>
    );
};

export default RandomQuote;
