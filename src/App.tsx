import { useState, useEffect } from 'react';
import { allRephraseData, categories } from './data';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RephraseCard from './components/RephraseCard';
import RandomQuote from './components/RandomQuote';
import WeeklyChallenge from './components/WeeklyChallenge';
import InstallPrompt from './components/InstallPrompt';
import HelpModal from './components/HelpModal';
import './App.css';

const ages = ['0-1歳', '2-3歳', '4-6歳', '小学生'];
const moods = ['イライラ', '急いでる', '余裕なし'];

const scenes = [
    { label: '朝の支度', tag: '朝', icon: '☀️' },
    { label: '食事', tag: '食事', icon: '🍽️' },
    { label: '片付け', tag: '片付け', icon: '🧸' },
    { label: 'お風呂', tag: 'お風呂', icon: '🛁' },
    { label: '寝かしつけ', tag: '就寝', icon: '💤' }, // Assuming '就寝' is the tag, need to verify
    { label: '外出', tag: '外出', icon: '👟' },
    { label: 'トイレ', tag: 'トイレ', icon: '🚽' },
    { label: '遊び', tag: '遊び', icon: '🎮' },
];

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [selectedScene, setSelectedScene] = useState<string | null>(null); // New State
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // localStorageからお気に入りと履歴を読み込む
    useEffect(() => {
        const savedFavorites = localStorage.getItem('parenting-favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
        const savedHistory = localStorage.getItem('parenting-search-history');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, []);

    // お気に入りをlocalStorageに保存
    useEffect(() => {
        localStorage.setItem('parenting-favorites', JSON.stringify(favorites));
    }, [favorites]);

    // 検索履歴を保存
    const saveSearchHistory = (query: string) => {
        if (!query.trim()) return;
        const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem('parenting-search-history', JSON.stringify(newHistory));
    };

    // 検索実行ハンドラ (Enterキーまたはフォーカスアウトで呼ぶ想定だが、今回はシンプルに効果的に履歴に残すため、検索バーの変更とは別に管理するか、デバウンスで保存するかが一般的。
    // ここでは、検索バーに「履歴から検索」機能をつけたり、ある程度入力確定したタイミングで保存するのが良いが、
    // シンプルに「検索バーでEnterを押した時」や「検索結果が表示された時」にする。
    // ReactのonChangeで都度保存は多すぎるので、一旦履歴機能は「検索バーの下に履歴を表示し、タップで検索実行」のみにフォーカスし、
    // 履歴への追加は「検索後に何かしらのアクションをした時」か、明示的な検索ボタンがないので、
    // ユーザーが検索バーからフォーカスを外した時(onBlur)に保存するように実装する)
    const handleSearchBlur = () => {
        if (searchQuery) {
            saveSearchHistory(searchQuery);
        }
        setTimeout(() => setShowHistory(false), 200); // リンククリックの時間を確保
    };

    // お気に入りのトグル
    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    // フィルタリングされたデータ
    const filteredData = allRephraseData.filter((item) => {
        // カテゴリーフィルター
        if (selectedCategory && item.category !== selectedCategory) {
            return false;
        }

        // シーンフィルター (New)
        // タグに含まれているかチェック。部分一致も含めるか検討だが、タグは完全一致推奨
        if (selectedScene && item.tags && !item.tags.some(tag => tag.includes(selectedScene))) {
            // 寝かしつけ (就寝) のタグ揺らぎに対応するため includes にしておく
            return false;
        }

        // 年齢フィルター
        if (selectedAge && item.targetAges && !item.targetAges.includes(selectedAge)) {
            return false;
        }

        // 気分フィルター
        if (selectedMood && item.moods && !item.moods.includes(selectedMood)) {
            return false;
        }

        // お気に入りフィルター
        if (showFavoritesOnly && !favorites.includes(item.id)) {
            return false;
        }

        // 検索フィルター
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesQuery =
                item.situation.toLowerCase().includes(query) ||
                item.before.toLowerCase().includes(query) ||
                item.after.empathy.toLowerCase().includes(query) ||
                item.after.action.toLowerCase().includes(query) ||
                item.after.logic.toLowerCase().includes(query) ||
                item.reason.toLowerCase().includes(query) ||
                item.tags.some((tag) => tag.toLowerCase().includes(query));
            return matchesQuery;
        }

        return true;
    });

    // Help Modal Handler
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div className="app">
            <header className="header">
                <button className="help-button" onClick={() => setShowHelp(true)} aria-label="使い方">
                    ?
                </button>
                <h1 className="title">
                    <span className="icon">💭</span>
                    育児の言い換え
                </h1>
                <p className="subtitle">
                    押しつけない、気づきの言葉がけ
                </p>
            </header>

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

            <div className="container">
                <RandomQuote />
                <WeeklyChallenge />

                <div className="controls">
                    <div className="search-section">
                        <SearchBar
                            value={searchQuery}
                            onChange={(val) => {
                                setSearchQuery(val);
                                setShowHistory(true);
                            }}
                            onFocus={() => setShowHistory(true)}
                            onBlur={() => {
                                // 少し遅延させて、履歴クリックが先に走るようにする
                                setTimeout(() => {
                                    handleSearchBlur();
                                    setShowHistory(false);
                                }, 200);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    saveSearchHistory(searchQuery);
                                    setShowHistory(false);
                                    // Enter時はフォーカスを外してキーボードを閉じる（スマホ対策）
                                    (e.target as HTMLInputElement).blur();
                                }
                            }}
                        />
                        {showHistory && searchHistory.length > 0 && (
                            <div
                                className="search-history"
                                onMouseDown={(e) => e.preventDefault()} // これでBlurの発火を防ぐ
                            >
                                <span className="history-label">最近:</span>
                                {searchHistory.map((hist, idx) => (
                                    <button
                                        key={idx}
                                        className="history-chip"
                                        onClick={() => {
                                            setSearchQuery(hist);
                                            saveSearchHistory(hist); // 履歴選択時もトップに移動させる
                                            setShowHistory(false);
                                        }}
                                    >
                                        {hist}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <FilterPanel
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        scenes={scenes}
                        selectedScene={selectedScene}
                        onSelectScene={setSelectedScene}
                        ages={ages}
                        selectedAge={selectedAge}
                        onSelectAge={setSelectedAge}
                        moods={moods}
                        selectedMood={selectedMood}
                        onSelectMood={setSelectedMood}
                    />

                    <div className="favorite-toggle">
                        <button
                            className={`toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
                            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        >
                            {showFavoritesOnly ? '全て表示' : `お気に入りのみ (${favorites.length})`}
                        </button>
                    </div>
                </div>

                <div className="results-info">
                    {filteredData.length} 件の言い換え
                </div>

                <div className="cards-grid">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <RephraseCard
                                key={item.id}
                                item={item}
                                isFavorite={favorites.includes(item.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <span className="no-results-icon">😢</span>
                            <p>条件に合う言葉が見つかりませんでした</p>
                            <p className="no-results-hint">
                                条件を少し広げてみるか、<br />
                                「すべて」に戻して探してみてください
                            </p>
                            <button
                                className="reset-btn"
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSelectedAge(null);
                                    setSelectedMood(null);
                                    setSelectedScene(null); // Reset scene too
                                    setSearchQuery('');
                                }}
                            >
                                条件をリセットする
                            </button>

                            {/* Smart Suggestions */}
                            <div className="smart-suggestions">
                                <p className="suggestions-title">こんな言葉はいかがですか？</p>
                                <div className="suggestion-cards">
                                    {allRephraseData
                                        .slice(0, 3) // 簡易的に最初の3件を表示（ランダムシャッフルも可だが固定で十分）
                                        // ※本来はカテゴリー違いなどを出したいが、シンプルにデータ先頭3件などにする
                                        // あるいはランダムに取得するロジックを入れる
                                        .sort(() => 0.5 - Math.random())
                                        .slice(0, 2) // 2件表示
                                        .map((item) => (
                                            <RephraseCard
                                                key={`suggestion-${item.id}`}
                                                item={item}
                                                isFavorite={favorites.includes(item.id)}
                                                onToggleFavorite={toggleFavorite}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <InstallPrompt />

            <footer className="footer">
                <p>作成者：いろパパ@<a href="https://omcha.jp/" target="_blank" rel="noopener noreferrer">おもちゃいろ</a> / <a href="https://home.omcha.jp/" target="_blank" rel="noopener noreferrer">おうちいろ</a></p>
            </footer>
        </div >
    );
}

export default App;
