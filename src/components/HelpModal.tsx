import React from 'react';
import { X, Heart, Sparkles, BrainCircuit } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}><X size={24} /></button>
                <h2 className="modal-title">3つの言い換えタイプについて</h2>
                <p className="modal-description">
                    このアプリでは、1つの言葉に対して3つの異なるアプローチを提案します。
                    お子さんの性格やその時の状況に合わせて使い分けてみてください。
                </p>

                <div className="help-types">
                    <div className="help-type-card empathy">
                        <div className="help-icon"><Heart size={24} /></div>
                        <h3>共感タイプ</h3>
                        <p className="sub">感情の受容</p>
                        <p className="desc">「嫌だったね」「痛かったね」と気持ちを受け止めることで、子どもの安心感を育てます。</p>
                    </div>

                    <div className="help-type-card action">
                        <div className="help-icon"><Sparkles size={24} /></div>
                        <h3>行動促進タイプ</h3>
                        <p className="sub">ポジティブな動機づけ</p>
                        <p className="desc">「ヒーローみたいに！」「競争しよう」など、楽しいイメージでやる気を引き出します。</p>
                    </div>

                    <div className="help-type-card logic">
                        <div className="help-icon"><BrainCircuit size={24} /></div>
                        <h3>論理説明タイプ</h3>
                        <p className="sub">理性への働きかけ</p>
                        <p className="desc">「こうすると、こうなるよ」と理由やメリットを説明し、納得して動けるようにします。</p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="close-btn" onClick={onClose}>閉じる</button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
