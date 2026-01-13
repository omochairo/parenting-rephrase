import { useState, useEffect } from 'react';
import { allRephraseData, categories } from './data';

import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RephraseCard from './components/RephraseCard';
import './App.css';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // localStorageからお気に入りを読み込む
    useEffect(() => {
        const savedFavorites = localStorage.getItem('parenting-favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // お気に入りをlocalStorageに保存
    useEffect(() => {
        localStorage.setItem('parenting-favorites', JSON.stringify(favorites));
    }, [favorites]);

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

        // お気に入りフィルター
        if (showFavoritesOnly && !favorites.includes(item.id)) {
            return false;
        }

        // 検索フィルター
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                item.situation.toLowerCase().includes(query) ||
                item.before.toLowerCase().includes(query) ||
                item.after.toLowerCase().includes(query) ||
                item.reason.toLowerCase().includes(query) ||
                item.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return true;
    });

    return (
        <div className="app">
            <header className="header">
                <h1 className="title">
                    <span className="icon">💭</span>
                    育児の言い換え
                </h1>
                <p className="subtitle">
                    押しつけない、気づきの言葉がけ
                </p>
            </header>

            <div className="container">
                <div className="controls">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />

                    <FilterPanel
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
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
                            <p>該当する言い換えが見つかりませんでした</p>
                            <p>別のキーワードやカテゴリーで試してみてください</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
