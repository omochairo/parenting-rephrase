import React from 'react';

interface FilterPanelProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="filter-panel">
            <button
                className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
                onClick={() => onSelectCategory(null)}
            >
                すべて
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterPanel;
