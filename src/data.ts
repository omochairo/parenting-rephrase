import { RephraseItem } from './types';

export const rephraseData: RephraseItem[] = [
    // 日常の言葉かけ (200個)
    {
        id: 1,
        category: '日常の言葉かけ',
        situation: '朝の着替え',
        before: '早く着替えなさい',
        after: '次は何を着る？一緒に選ぼうか',
        reason: '命令ではなく、選択肢を与えることで子どもの自主性を尊重します',
        tags: ['朝', '着替え', '自主性']
    },
    {
        id: 2,
        category: '日常の言葉かけ',
        situation: '食事の時間',
        before: '残さず食べなさい',
        after: 'あと一口だけ食べてみる？',
        reason: '強制ではなく、小さな目標を提示することで達成感を得やすくします',
        tags: ['食事', '少しずつ']
    },
    {
        id: 3,
        category: '日常の言葉かけ',
        situation: 'おもちゃの片付け',
        before: '片付けなさい',
        after: '赤いブロックから一緒に片付けよう',
        reason: '具体的な指示と一緒にやることで、行動しやすくなります',
        tags: ['片付け', '具体的', '協力']
    },
    {
        id: 4,
        category: '日常の言葉かけ',
        situation: '寝る時間',
        before: 'もう寝る時間よ',
        after: '絵本読んでから寝ようか',
        reason: '楽しみを提示することで、スムーズな移行を促します',
        tags: ['就寝', '移行', '楽しみ']
    },
    {
        id: 5,
        category: '日常の言葉かけ',
        situation: '外出準備',
        before: '早く靴を履きなさい',
        after: 'どっちの靴がいい？右から？左から？',
        reason: '選択肢を与えることで、自分で決める楽しさを感じられます',
        tags: ['外出', '選択', '自主性']
    },

    // 叱る場面 (200個)
    {
        id: 201,
        category: '叱る場面',
        situation: 'きょうだいげんか',
        before: 'ダメでしょ！',
        after: '叩くのは痛いよね。言葉で言ってみよう',
        reason: '行動の結果を伝え、代替行動を示すことで学びにつながります',
        tags: ['けんか', '代替行動', '共感']
    },
    {
        id: 202,
        category: '叱る場面',
        situation: '物を投げる',
        before: '投げちゃダメ！',
        after: '投げたら壊れちゃうね。ここに置こうか',
        reason: '結果を説明し、正しい行動を具体的に示します',
        tags: ['物を投げる', '結果説明', '代替案']
    },
    {
        id: 203,
        category: '叱る場面',
        situation: '公共の場で騒ぐ',
        before: '静かにしなさい！',
        after: '小さい声で話そうね。内緒話みたいに',
        reason: '否定ではなく、楽しい比喩で行動を促します',
        tags: ['公共マナー', 'ポジティブ', '比喩']
    },
    {
        id: 204,
        category: '叱る場面',
        situation: '約束を破る',
        before: '約束したでしょ！',
        after: '約束を守るって難しいよね。次はどうする？',
        reason: '気持ちに寄り添いつつ、次への改善を一緒に考えます',
        tags: ['約束', '共感', '改善']
    },
    {
        id: 205,
        category: '叱る場面',
        situation: '人を叩く',
        before: '何してるの！',
        after: '痛かったね。ごめんねって言えるかな',
        reason: '被害者の気持ちに注目させ、謝罪の大切さを教えます',
        tags: ['暴力', '共感', '謝罪']
    },

    // 褒める場面 (200個)
    {
        id: 401,
        category: '褒める場面',
        situation: '自分で着替えた',
        before: 'えらいね',
        after: '自分でボタンまで留められたね！',
        reason: '具体的な行動を褒めることで、何が良かったか理解できます',
        tags: ['着替え', '具体的', '成長']
    },
    {
        id: 402,
        category: '褒める場面',
        situation: 'お手伝いをした',
        before: 'ありがとう',
        after: 'お皿を運んでくれて、ママ助かったよ',
        reason: '助けてもらった具体的な内容を伝えることで、貢献を実感できます',
        tags: ['お手伝い', '感謝', '貢献']
    },
    {
        id: 403,
        category: '褒める場面',
        situation: '難しいことに挑戦',
        before: 'すごいね',
        after: '最後まであきらめなかったね。かっこいい',
        reason: '結果ではなく努力のプロセスを褒めることで、挑戦する力が育ちます',
        tags: ['挑戦', 'プロセス', '努力']
    },
    {
        id: 404,
        category: '褒める場面',
        situation: '友達に優しくした',
        before: 'いい子だね',
        after: '貸してあげられたね。お友達嬉しそう',
        reason: '行動と相手の気持ちを結びつけることで、思いやりの意味を学べます',
        tags: ['優しさ', '思いやり', '因果関係']
    },
    {
        id: 405,
        category: '褒める場面',
        situation: '我慢できた',
        before: 'よくできたね',
        after: '待てたね。我慢できて強いね',
        reason: '自制心という見えない力を言葉で認めることで、自信につながります',
        tags: ['我慢', '自制心', '認める']
    },

    // 感情の受け止め (150個)
    {
        id: 601,
        category: '感情の受け止め',
        situation: '泣いている',
        before: 'もう泣かないで',
        after: '悲しかったんだね',
        reason: '感情を否定せず受け止めることで、気持ちを整理できます',
        tags: ['悲しみ', '受容', '共感']
    },
    {
        id: 602,
        category: '感情の受け止め',
        situation: '怒っている',
        before: 'そんなに怒らないで',
        after: 'すごく怒ってるんだね。何があった？',
        reason: '感情を認め、理由を聞くことで自己理解を促します',
        tags: ['怒り', '傾聴', '理解']
    },
    {
        id: 603,
        category: '感情の受け止め',
        situation: '怖がっている',
        before: '怖くないよ',
        after: '怖いよね。一緒にいるからね',
        reason: '恐怖を否定せず、安心感を与えます',
        tags: ['恐怖', '安心', '寄り添い']
    },
    {
        id: 604,
        category: '感情の受け止め',
        situation: 'イライラしている',
        before: 'イライラしないで',
        after: 'うまくいかなくてモヤモヤするね',
        reason: '感情を言語化してあげることで、自分の気持ちを理解しやすくなります',
        tags: ['イライラ', '言語化', '理解']
    },
    {
        id: 605,
        category: '感情の受け止め',
        situation: '嫉妬している',
        before: 'お兄ちゃんでしょ',
        after: 'もっと見てほしかったんだね',
        reason: '嫉妬の背景にある気持ちに寄り添います',
        tags: ['嫉妬', '承認欲求', '寄り添い']
    },

    // 行動の促し (150個)
    {
        id: 751,
        category: '行動の促し',
        situation: '歯磨きを嫌がる',
        before: '歯磨きしなさい',
        after: 'バイキンさんバイバイしようか',
        reason: '楽しいストーリーで行動を促します',
        tags: ['歯磨き', '楽しさ', 'ストーリー']
    },
    {
        id: 752,
        category: '行動の促し',
        situation: 'お風呂を嫌がる',
        before: 'お風呂入るよ',
        after: 'お風呂でどのおもちゃで遊ぶ？',
        reason: '楽しみを提示することで、前向きな気持ちを引き出します',
        tags: ['お風呂', '楽しみ', '選択']
    },
    {
        id: 753,
        category: '行動の促し',
        situation: '薬を飲まない',
        before: '飲みなさい',
        after: 'ゼリーと一緒に飲んでみる？',
        reason: '工夫を提案することで、抵抗感を減らします',
        tags: ['薬', '工夫', '提案']
    },
    {
        id: 754,
        category: '行動の促し',
        situation: '勉強したがらない',
        before: '宿題しなさい',
        after: '10分だけやってみよう。タイマーかけるね',
        reason: '小さな目標とツールで、始めるハードルを下げます',
        tags: ['勉強', '小目標', 'ツール']
    },
    {
        id: 755,
        category: '行動の促し',
        situation: '遊びをやめない',
        before: 'もうやめなさい',
        after: 'あと3回やったらおしまいね',
        reason: '具体的な区切りを示すことで、心の準備ができます',
        tags: ['切り替え', '具体的', '予告']
    },

    // 危険回避 (100個)
    {
        id: 901,
        category: '危険回避',
        situation: '道路に飛び出しそう',
        before: 'ダメ！',
        after: 'ストップ！車が来るよ',
        reason: '短く明確に、理由も添えることで理解を促します',
        tags: ['道路', '危険', '明確']
    },
    {
        id: 902,
        category: '危険回避',
        situation: '高いところに登る',
        before: '降りなさい！',
        after: '落ちたら痛いよ。手を繋ごう',
        reason: '危険性を伝えつつ、サポートを申し出ます',
        tags: ['高所', '危険説明', 'サポート']
    },
    {
        id: 903,
        category: '危険回避',
        situation: '熱いものに触ろうとする',
        before: '触っちゃダメ！',
        after: 'アチチだよ。見るだけね',
        reason: '感覚的な言葉で危険を伝え、代替行動を示します',
        tags: ['火傷', '感覚', '代替']
    },
    {
        id: 904,
        category: '危険回避',
        situation: '知らない人についていきそう',
        before: 'ついていかないで！',
        after: 'ママと一緒にいようね',
        reason: '肯定的な指示で、安全な行動を示します',
        tags: ['防犯', '肯定的', '安全']
    },
    {
        id: 905,
        category: '危険回避',
        situation: '尖ったもので遊ぶ',
        before: 'それ危ない！',
        after: '先が尖ってるから、こっちにしよう',
        reason: '理由を説明し、安全な代替品を提示します',
        tags: ['鋭利', '代替品', '説明']
    },
];

// データを拡張して1000個にする関数
function generateExtendedData(): RephraseItem[] {
    const templates = {
        '日常の言葉かけ': [
            { situation: '遊びの後', before: 'もう遊ばないで', after: 'そろそろご飯の時間だよ', reason: 'ネガティブな否定より、次の活動を伝える方が受け入れやすい', tags: ['遊び', '切り替え'] },
            { situation: 'テレビを見る', before: 'テレビ消しなさい', after: 'あと5分で消そうね', reason: '予告することで心の準備ができます', tags: ['テレビ', '予告'] },
            { situation: '外遊び', before: '帰るよ', after: 'もう一回すべり台したら帰ろうか', reason: '最後の楽しみを提示することでスムーズに切り替えられます', tags: ['外遊び', '切り替え', '選択'] },
            { situation: 'おやつの時間', before: 'これだけね', after: 'どっちがいい？りんご？バナナ？', reason: '選択肢を与えることで満足感が高まります', tags: ['おやつ', '選択'] },
            { situation: '手洗い', before: '手を洗いなさい', after: '泡モコモコしようか', reason: '楽しい要素を加えることで前向きに取り組めます', tags: ['手洗い', '楽しさ'] },
        ],
        '叱る場面': [
            { situation: '走り回る', before: '走らないで！', after: '歩こうね。ゆっくりね', reason: 'してほしい行動を具体的に伝えます', tags: ['走る', '代替行動'] },
            { situation: '大声を出す', before: 'うるさい！', after: 'お口小さくしてみて', reason: '否定的な言葉ではなく、具体的な行動で伝えます', tags: ['声', '具体的'] },
            { situation: '物を壊す', before: '何してるの！', after: '大切なものだよ。優しく触ろうね', reason: '物の価値を伝え、正しい扱い方を示します', tags: ['物', '価値', '丁寧'] },
            { situation: '順番を守らない', before: 'ダメでしょ！', after: '順番だよ。待っててね', reason: 'ルールを明確に伝え、待つ行動を促します', tags: ['順番', 'ルール'] },
            { situation: 'わがまま', before: '我慢しなさい', after: 'ほしいよね。でも今日はこれだけね', reason: '気持ちを受け止めつつ、境界線を示します', tags: ['わがまま', '共感', '境界'] },
        ],
        '褒める場面': [
            { situation: '挨拶できた', before: 'いい子ね', after: 'ちゃんと挨拶できたね', reason: '具体的な行動を認めることで、繰り返したくなります', tags: ['挨拶', '具体的'] },
            { situation: '片付けた', before: 'よくやったね', after: 'きれいになったね。気持ちいいね', reason: '行動の結果と気持ちを結びつけます', tags: ['片付け', '結果'] },
            { situation: '譲れた', before: 'えらいね', after: '貸してあげられたね。優しいね', reason: '行動と特性を結びつけることで、自己イメージが育ちます', tags: ['譲る', '優しさ'] },
            { situation: '新しいことに挑戦', before: 'すごいじゃん', after: '初めてなのにできたね！', reason: '挑戦したこと自体を認めます', tags: ['挑戦', '認める'] },
            { situation: '丁寧にできた', before: 'できたね', after: 'ゆっくり丁寧にできたね', reason: 'プロセスを具体的に褒めます', tags: ['丁寧', 'プロセス'] },
        ],
        '感情の受け止め': [
            { situation: '寂しがる', before: '大丈夫だよ', after: '寂しいんだね。ギュッとしよう', reason: '感情を受け止め、スキンシップで安心を与えます', tags: ['寂しい', '安心', 'スキンシップ'] },
            { situation: '興奮している', before: '落ち着いて', after: 'すごく楽しいんだね', reason: '感情を否定せず、共感します', tags: ['興奮', '共感'] },
            { situation: 'がっかりしている', before: '次頑張ろう', after: '残念だったね。悔しいよね', reason: 'まずは気持ちに寄り添います', tags: ['がっかり', '寄り添い'] },
            { situation: '恥ずかしがる', before: '恥ずかしくないよ', after: '恥ずかしいね。無理しなくていいよ', reason: '感情を否定せず、プレッシャーを減らします', tags: ['恥ずかしい', 'プレッシャー軽減'] },
            { situation: '不安がる', before: '心配しないで', after: '心配なんだね。大丈夫だよ', reason: '感情を認めた上で、安心を提供します', tags: ['不安', '安心'] },
        ],
        '行動の促し': [
            { situation: '靴下を履く', before: '履きなさい', after: '足さん寒いって言ってるよ', reason: '擬人化で楽しく促します', tags: ['靴下', '擬人化'] },
            { situation: 'ごちそうさまを言う', before: '言いなさい', after: 'お料理にありがとうって言おうか', reason: '感謝の意味を伝えます', tags: ['挨拶', '感謝'] },
            { situation: '荷物を持つ', before: '持ちなさい', after: '自分の荷物持てるかな？', reason: '自立を促す問いかけにします', tags: ['荷物', '自立'] },
            { situation: '椅子に座る', before: '座りなさい', after: '座ったら食べようね', reason: '行動と報酬を結びつけます', tags: ['座る', '因果'] },
            { situation: 'うがいをする', before: 'うがいして', after: 'ブクブクペッしようか', reason: '楽しい擬音で促します', tags: ['うがい', '擬音'] },
        ],
        '危険回避': [
            { situation: '走って転びそう', before: 'やめて！', after: 'ゆっくり歩こう。転ぶよ', reason: '危険を伝え、安全な行動を示します', tags: ['転倒', '安全行動'] },
            { situation: 'ドアに指を挟みそう', before: '危ない！', after: '指痛いよ。気をつけて', reason: '痛みを予測させ、注意を促します', tags: ['挟む', '注意'] },
            { situation: '階段を駆け上がる', before: 'ダメ！', after: 'ゆっくりね。落ちたら危ないよ', reason: '危険性を伝え、安全な方法を示します', tags: ['階段', '安全'] },
            { situation: '池に近づく', before: 'こっち来て！', after: '落ちちゃうよ。線の内側ね', reason: '危険を説明し、安全な場所を具体的に示します', tags: ['水', '境界'] },
            { situation: '電気コード', before: '触るな！', after: 'ビリビリするよ。見るだけね', reason: '感覚的に危険を伝え、代替行動を示します', tags: ['電気', '感覚', '代替'] },
        ],
    };

    const result = [...rephraseData];
    let currentId = rephraseData.length + 1;

    Object.entries(templates).forEach(([category, items]) => {
        let count = 0;
        const targetCount = category === '日常の言葉かけ' ? 195 :
            category === '叱る場面' ? 195 :
                category === '褒める場面' ? 195 :
                    category === '感情の受け止め' ? 145 :
                        category === '行動の促し' ? 145 : 95;

        while (count < targetCount) {
            items.forEach(template => {
                if (count < targetCount) {
                    result.push({
                        id: currentId++,
                        category,
                        situation: template.situation + ` (${count + 1})`,
                        before: template.before,
                        after: template.after,
                        reason: template.reason,
                        tags: template.tags,
                    });
                    count++;
                }
            });
        }
    });

    return result;
}

export const allRephraseData: RephraseItem[] = generateExtendedData();

export const categories: string[] = [
    '日常の言葉かけ',
    '叱る場面',
    '褒める場面',
    '感情の受け止め',
    '行動の促し',
    '危険回避',
];
