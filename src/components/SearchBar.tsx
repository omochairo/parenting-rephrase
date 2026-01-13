import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // New prop
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onFocus, onBlur, onKeyDown }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="キーワードで検索..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown} // Pass it down
            />
            <span className="search-icon">🔍</span>
        </div>
    );
};

export default SearchBar;
