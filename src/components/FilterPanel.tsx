import React from 'react';

interface FilterPanelProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    ages: string[];
    selectedAge: string | null;
    onSelectAge: (age: string | null) => void;
    moods: string[];
    selectedMood: string | null;
    onSelectMood: (mood: string | null) => void;
    scenes: { label: string; tag: string; icon: string }[]; // New prop
    selectedScene: string | null; // New prop
    onSelectScene: (scene: string | null) => void; // New prop
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
    ages,
    selectedAge,
    onSelectAge,
    moods,
    selectedMood,
    onSelectMood,
    scenes,
    selectedScene,
    onSelectScene,
}) => {
    return (
        <div className="filter-panel">
            {/* Category Filter */}
            <div className="filter-section">
                <h3 className="filter-title">状況から探す</h3>
                <div className="filter-chips">
                    <button
                        className={`filter-chip ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => onSelectCategory(null)}
                    >
                        すべて
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => onSelectCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scene Filter (New) */}
            <div className="filter-section">
                <h3 className="filter-title">場面から探す</h3>
                <div className="filter-scenes">
                    <button
                        className={`filter-scene-btn ${selectedScene === null ? 'active' : ''}`}
                        onClick={() => onSelectScene(null)}
                    >
                        指定なし
                    </button>
                    {scenes.map((scene) => (
                        <button
                            key={scene.label}
                            className={`filter-scene-btn ${selectedScene === scene.tag ? 'active' : ''}`}
                            onClick={() => onSelectScene(scene.tag)}
                        >
                            <span className="scene-icon">{scene.icon}</span>
                            {scene.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Filter */}
            <div className="filter-section">
                <h3 className="filter-title">年齢から探す</h3>
                <div className="filter-chips">
                    <button
                        className={`filter-chip ${selectedAge === null ? 'active' : ''}`}
                        onClick={() => onSelectAge(null)}
                    >
                        指定なし
                    </button>
                    {ages.map((age) => (
                        <button
                            key={age}
                            className={`filter-chip ${selectedAge === age ? 'active' : ''}`}
                            onClick={() => onSelectAge(age)}
                        >
                            {age}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mood Filter */}
            <div className="filter-section">
                <h3 className="filter-title">今の気分から探す</h3>
                <div className="filter-moods">
                    <button
                        className={`filter-mood-btn ${selectedMood === null ? 'active' : ''}`}
                        onClick={() => onSelectMood(null)}
                    >
                        指定なし
                    </button>
                    {moods.map((mood) => (
                        <button
                            key={mood}
                            className={`filter-mood-btn ${selectedMood === mood ? 'active' : ''}`}
                            onClick={() => onSelectMood(mood)}
                        >
                            {mood === 'イライラ' ? '😡 ' : mood === '急いでる' ? '🏃 ' : '😰 '}
                            {mood}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
