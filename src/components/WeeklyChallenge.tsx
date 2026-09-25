import React from 'react';
import { weekIndexJST } from '../dates';

interface WeeklyContent {
    week: number;
    challenge: string;
    columnTitle: string;
    columnText: string;
}

const weeklyData: WeeklyContent[] = [
    {
        week: 1,
        challenge: '「早くして」を言わずに、次の行動を促してみよう',
        columnTitle: '言葉は鏡',
        columnText: '子どもは大人の言葉を驚くほどよく聞いています。ポジティブな言葉がけは、ポジティブな思考を育てます。今週は「肯定形」を意識してみましょう。'
    },
    {
        week: 2,
        challenge: '失敗した時、「大丈夫？」より先に「びっくりしたね」と言ってみよう',
        columnTitle: '共感のパワー',
        columnText: '「痛くないよ」といった否定より、「痛かったね」という受容が、子どもの安心感を育てます。まずは気持ちに寄り添う一言から。'
    },
    {
        week: 3,
        challenge: '寝る前に、今日あった「楽しかったこと」を1つ聞いてみよう',
        columnTitle: 'スリー・グッド・シングス',
        columnText: '寝る前に良いことを思い出すと、睡眠の質が上がり、幸福感も高まると言われています。親子でハッピーな気持ちで眠りにつきましょう。'
    },
    {
        week: 4,
        challenge: '「ダメ」の代わりに「〜しよう」と提案型で伝えてみよう',
        columnTitle: '脳は否定形を理解しにくい',
        columnText: '「走らないで」と言われると、脳は「走る」イメージを持ってしまいます。「歩こうね」と伝えることで、望ましい行動が伝わりやすくなります。'
    }
];

interface WeeklyChallengeProps {
    // 「今日使えた！」を押した回数
    usedToday: number;
    usedThisWeek: number;
}

const WeeklyChallenge: React.FC<WeeklyChallengeProps> = ({ usedToday, usedThisWeek }) => {
    // 月曜始まり（日本時間）の週番号で4週ローテーション
    const currentContent = weeklyData[weekIndexJST() % weeklyData.length];

    return (
        <div className="weekly-section">
            <div className="weekly-challenge-card">
                <h3 className="weekly-title">
                    <span className="icon">🌱</span> 今週のチャレンジ
                </h3>
                <p className="challenge-text">{currentContent.challenge}</p>
                <p className="usage-count" aria-live="polite">
                    {usedThisWeek > 0
                        ? `🌸 今週 ${usedThisWeek} 回、言い換えできました（今日 ${usedToday} 回）`
                        : 'カードの「今日使えた！」を押すと、ここに記録されます'}
                </p>
            </div>

            <div className="weekly-column-card">
                <h3 className="weekly-title">
                    <span className="icon">📖</span> 子育てコラム：{currentContent.columnTitle}
                </h3>
                <p className="column-text">{currentContent.columnText}</p>
            </div>
        </div>
    );
};

export default WeeklyChallenge;
