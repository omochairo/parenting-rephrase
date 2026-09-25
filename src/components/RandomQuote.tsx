import React, { useState, useEffect, useRef } from 'react';
import { RephraseGroup } from '../types';
import { rephraseGroups } from '../data';
import { daysSinceEpochJST } from '../dates';
import './RandomQuote.css';

// 「今日のひとこと」は日付で決まる（1日の中でリロードしても変わらない）
function todaysQuote(): RephraseGroup {
    return rephraseGroups[daysSinceEpochJST() % rephraseGroups.length];
}

const RandomQuote: React.FC = () => {
    const [quote, setQuote] = useState<RephraseGroup>(todaysQuote);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const showAnother = () => {
        setIsAnimating(true);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setQuote((cur) => {
                const others = rephraseGroups.filter((g) => g.key !== cur.key);
                return others[Math.floor(Math.random() * others.length)];
            });
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="random-quote-container">
            <h2 className="random-quote-title">
                <span className="icon">🍀</span> 今日のひとこと
            </h2>
            <div className={`random-quote-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="quote-situation">場面：{quote.situation}</div>
                <div className="quote-content">
                    <div className="quote-before">
                        <span className="cross-icon">✕</span> {quote.befores[0]}
                    </div>
                </div>
                <div className="quote-arrow">⬇︎</div>
                <div className="quote-after">
                    <div className="quote-type">💕 共感: {quote.after.empathy}</div>
                    <div className="quote-type">✨ 行動: {quote.after.action}</div>
                    <div className="quote-type">💡 論理: {quote.after.logic}</div>
                </div>
            </div>
            <p className="quote-reason">💡 {quote.reason}</p>
            <button className="refresh-btn" onClick={showAnother} aria-label="別の言葉を見る">
                🔄 別の言葉を見る
            </button>
        </div>
    );
};

export default RandomQuote;
