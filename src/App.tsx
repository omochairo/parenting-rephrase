import { useState, useEffect, useMemo } from 'react';
import { LifeBuoy } from 'lucide-react';
import { rephraseGroups, allCategories, scenes, ageBuckets, legacyIdToGroupKey } from './data';
import { RephraseGroup } from './types';
import { loadJSON, saveJSON } from './storage';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RephraseCard from './components/RephraseCard';
import RandomQuote from './components/RandomQuote';
import WeeklyChallenge from './components/WeeklyChallenge';
import InstallPrompt from './components/InstallPrompt';
import HelpModal from './components/HelpModal';
import SosModal from './components/SosModal';
import { dateKeyJST, weekIndexJST } from './dates';
import './App.css';

const moods = ['イライラ', '急いでる', '余裕なし'];

const FAVORITES_KEY = 'parenting-favorites-v2';
const LEGACY_FAVORITES_KEY = 'parenting-favorites';
const HISTORY_KEY = 'parenting-search-history';
const USAGE_KEY = 'parenting-usage-log';

// 「今日使えた！」の記録。{ 'YYYY-MM-DD': 回数 }
type UsageLog = Record<string, number>;

function loadUsage(): UsageLog {
    const saved = loadJSON<unknown>(USAGE_KEY, {});
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    const log: UsageLog = {};
    for (const [k, v] of Object.entries(saved)) {
        if (typeof v === 'number') log[k] = v;
    }
    return log;
}

function countThisWeek(log: UsageLog): number {
    const week = weekIndexJST();
    return Object.entries(log)
        .filter(([date]) => weekIndexJST(new Date(`${date}T12:00:00+09:00`)) === week)
        .reduce((sum, [, n]) => sum + n, 0);
}

// お気に入りは場面名で保存する。旧形式（連番 id）が残っていれば一度だけ移行する
function loadFavorites(): string[] {
    const saved = loadJSON<unknown>(FAVORITES_KEY, null);
    if (Array.isArray(saved)) {
        return saved.filter((v): v is string => typeof v === 'string');
    }
    const legacy = loadJSON<unknown>(LEGACY_FAVORITES_KEY, []);
    if (!Array.isArray(legacy)) return [];
    const keys = legacy
        .filter((v): v is number => typeof v === 'number')
        .map(legacyIdToGroupKey)
        .filter((k): k is string => k !== undefined);
    return Array.from(new Set(keys));
}

function loadHistory(): string[] {
    const saved = loadJSON<unknown>(HISTORY_KEY, []);
    return Array.isArray(saved) ? saved.filter((v): v is string => typeof v === 'string') : [];
}

function initialQuery(): string {
    return new URLSearchParams(window.location.search).get('q') ?? '';
}

// 検索ヒット判定。ヒットした「言い換え前」があればそれを返す
function matchGroup(group: RephraseGroup, query: string): { hit: boolean; matchedBefore?: string } {
    if (!query) return { hit: true };
    const q = query.toLowerCase();
    const matchedBefore = group.befores.find((b) => b.toLowerCase().includes(q));
    if (matchedBefore) return { hit: true, matchedBefore };
    const fields = [
        group.situation,
        group.after.empathy,
        group.after.action,
        group.after.logic,
        group.reason,
        ...group.tags,
    ];
    return { hit: fields.some((f) => f.toLowerCase().includes(q)) };
}

// 「早くして」「片付けなさい」のように語尾まで打つと部分一致しないので、
// 0件のときは命令・依頼の語尾を落とした語幹で探し直す
// 1文字の語尾（「寝ろ」の「ろ」など）は名詞の末尾と区別できないので（「うしろ」「おふろ」）、
// 語幹が3文字以上残るときだけ落とす。どの場合も語幹は2文字以上残す（「まって」→「ま」にしない）
const ENDINGS: { pattern: RegExp; minStem: number }[] = [
    { pattern: /[!！?？。、\s]+$/, minStem: 1 },
    { pattern: /(しなさい|なさい|してよ|してね|ってよ|ってね|しろ|して|って|てよ|てね)$/, minStem: 2 },
    { pattern: /[ろて]$/, minStem: 3 },
];

function stemQuery(query: string): string {
    let stem = query.trim();
    for (let changed = true; changed; ) {
        changed = false;
        for (const { pattern, minStem } of ENDINGS) {
            const next = stem.replace(pattern, '');
            if (next !== stem && next.length >= minStem) {
                stem = next;
                changed = true;
            }
        }
    }
    return stem;
}

function App() {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [selectedScene, setSelectedScene] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>(loadFavorites);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>(loadHistory);
    const [showHistory, setShowHistory] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showSos, setShowSos] = useState(false);
    const [usage, setUsage] = useState<UsageLog>(loadUsage);

    useEffect(() => {
        saveJSON(FAVORITES_KEY, favorites);
    }, [favorites]);

    useEffect(() => {
        saveJSON(USAGE_KEY, usage);
    }, [usage]);

    const markUsed = () => {
        const today = dateKeyJST();
        setUsage((prev) => ({ ...prev, [today]: (prev[today] ?? 0) + 1 }));
    };

    // 検索語を URL に反映する（共有リンクやリロードで同じ結果を開けるように）。
    // 1文字ごとに履歴を積まないよう replaceState にしている
    useEffect(() => {
        const url = new URL(window.location.href);
        if (searchQuery) {
            url.searchParams.set('q', searchQuery);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState(null, '', url);
    }, [searchQuery]);

    const saveSearchHistory = (query: string) => {
        const q = query.trim();
        if (!q) return;
        setSearchHistory((prev) => {
            const next = [q, ...prev.filter((h) => h !== q)].slice(0, 5);
            saveJSON(HISTORY_KEY, next);
            return next;
        });
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        saveJSON(HISTORY_KEY, []);
    };

    const toggleFavorite = (key: string) => {
        setFavorites((prev) =>
            prev.includes(key) ? prev.filter((fav) => fav !== key) : [...prev, key]
        );
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setSelectedAge(null);
        setSelectedMood(null);
        setSelectedScene(null);
        setShowFavoritesOnly(false);
        setSearchQuery('');
    };

    const hasActiveFilter =
        selectedCategory !== null ||
        selectedAge !== null ||
        selectedMood !== null ||
        selectedScene !== null ||
        showFavoritesOnly ||
        searchQuery !== '';

    const { filteredData, stemmedQuery } = useMemo(() => {
        const candidates = rephraseGroups.filter((group) => {
            if (selectedCategory && group.category !== selectedCategory) return false;
            if (selectedScene && !group.tags.some((tag) => tag.includes(selectedScene))) return false;
            if (selectedAge && !group.targetAges.includes(selectedAge)) return false;
            if (selectedMood && !group.moods.includes(selectedMood)) return false;
            if (showFavoritesOnly && !favorites.includes(group.key)) return false;
            return true;
        });
        const search = (query: string) =>
            candidates.flatMap((group) => {
                const { hit, matchedBefore } = matchGroup(group, query);
                return hit ? [{ group, matchedBefore }] : [];
            });

        const query = searchQuery.trim();
        const exact = search(query);
        const stem = stemQuery(query);
        if (exact.length > 0 || stem === query) return { filteredData: exact, stemmedQuery: null };
        return { filteredData: search(stem), stemmedQuery: stem };
    }, [selectedCategory, selectedScene, selectedAge, selectedMood, showFavoritesOnly, favorites, searchQuery]);

    const phraseCount = filteredData.reduce((sum, r) => sum + r.group.befores.length, 0);

    // 0件のときのおすすめ。描画のたびに入れ替わらないよう、条件が変わった時だけ選び直す
    const isEmpty = filteredData.length === 0;
    const suggestions = useMemo(() => {
        if (!isEmpty) return [];
        return [...rephraseGroups].sort(() => Math.random() - 0.5).slice(0, 2);
    }, [isEmpty, searchQuery]);

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
                <button className="sos-button" onClick={() => setShowSos(true)}>
                    <LifeBuoy size={18} aria-hidden="true" /> いま困ってる
                </button>
            </header>

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
            {/* 閉じたらアンマウントして、次に開いたときは場面選択から始める */}
            {showSos && <SosModal onClose={() => setShowSos(false)} onMarkUsed={markUsed} />}

            <div className="container">
                <RandomQuote />
                <WeeklyChallenge usedToday={usage[dateKeyJST()] ?? 0} usedThisWeek={countThisWeek(usage)} />

                <div className="controls">
                    <div className="search-section">
                        <SearchBar
                            value={searchQuery}
                            onChange={(val) => {
                                setSearchQuery(val);
                                setShowHistory(true);
                            }}
                            onClear={() => setSearchQuery('')}
                            onFocus={() => setShowHistory(true)}
                            onBlur={() => {
                                saveSearchHistory(searchQuery);
                                setShowHistory(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // Enter時はフォーカスを外してキーボードを閉じる（スマホ対策）。履歴保存は onBlur で行う
                                    e.currentTarget.blur();
                                }
                            }}
                        />
                        {showHistory && searchHistory.length > 0 && (
                            <div
                                className="search-history"
                                onMouseDown={(e) => e.preventDefault()} // 履歴クリック前に input の blur が走るのを防ぐ
                            >
                                <span className="history-label">最近:</span>
                                {searchHistory.map((hist) => (
                                    <button
                                        key={hist}
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
                                <button className="history-clear" onClick={clearSearchHistory}>
                                    履歴を消す
                                </button>
                            </div>
                        )}
                    </div>

                    <FilterPanel
                        categories={allCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        scenes={scenes}
                        selectedScene={selectedScene}
                        onSelectScene={setSelectedScene}
                        ages={ageBuckets}
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
                            aria-pressed={showFavoritesOnly}
                        >
                            {showFavoritesOnly ? '全て表示' : `お気に入りのみ (${favorites.length})`}
                        </button>
                        {hasActiveFilter && (
                            <button className="toggle-btn reset-inline" onClick={resetFilters}>
                                条件をリセット
                            </button>
                        )}
                    </div>
                </div>

                <div className="results-info" aria-live="polite">
                    {stemmedQuery && filteredData.length > 0 && (
                        <span className="stem-note">「{searchQuery.trim()}」は見つからなかったので「{stemmedQuery}」で探しました<br /></span>
                    )}
                    {filteredData.length} 場面・{phraseCount} 通りの言い方
                </div>

                <div className="cards-grid">
                    {filteredData.length > 0 ? (
                        filteredData.map(({ group, matchedBefore }) => (
                            <RephraseCard
                                key={group.key}
                                item={group}
                                matchedBefore={matchedBefore}
                                isFavorite={favorites.includes(group.key)}
                                onToggleFavorite={toggleFavorite}
                                onMarkUsed={markUsed}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <span className="no-results-icon">😢</span>
                            <p>
                                {showFavoritesOnly && favorites.length === 0
                                    ? 'まだお気に入りがありません'
                                    : '条件に合う言葉が見つかりませんでした'}
                            </p>
                            <p className="no-results-hint">
                                {showFavoritesOnly && favorites.length === 0 ? (
                                    <>カードの ♡ を押すと、ここに集まります</>
                                ) : (
                                    <>条件を少し広げてみるか、<br />「すべて」に戻して探してみてください</>
                                )}
                            </p>
                            <button className="reset-btn" onClick={resetFilters}>
                                条件をリセットする
                            </button>

                            <div className="smart-suggestions">
                                <p className="suggestions-title">こんな言葉はいかがですか？</p>
                                <div className="suggestion-cards">
                                    {suggestions.map((group) => (
                                        <RephraseCard
                                            key={`suggestion-${group.key}`}
                                            item={group}
                                            isFavorite={favorites.includes(group.key)}
                                            onToggleFavorite={toggleFavorite}
                                onMarkUsed={markUsed}
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
        </div>
    );
}

export default App;
