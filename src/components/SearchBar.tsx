import React from 'react';
import { X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear, onFocus, onBlur, onKeyDown }) => {
    return (
        <div className="search-bar">
            <input
                type="search"
                enterKeyHint="search"
                className="search-input"
                placeholder="言いがちな言葉や場面で検索（例: 早くして）"
                aria-label="キーワード検索"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
            {value ? (
                <button
                    className="search-clear"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onClear}
                    aria-label="検索語を消す"
                >
                    <X size={18} />
                </button>
            ) : (
                <span className="search-icon" aria-hidden="true">🔍</span>
            )}
        </div>
    );
};

export default SearchBar;
