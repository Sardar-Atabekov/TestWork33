import React, { useState, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.scss';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (city: string) => void;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, defaultValue = '' }: SearchBarProps) => {
  const [city, setCity] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (city.trim()) {
      if (onSearch) {
        onSearch(city.trim());
      } else {
        router.push(`/?city=${encodeURIComponent(city.trim())}`);
      }
    }
  };

  const handleSearch = useCallback((value: string) => setCity(value), []);

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name (e.g., London, Moscow, Tokyo)"
          value={city}
          onChange={handleSearch}
          aria-label="City name"
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!city.trim()}
        >
          <Search
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-1"
          />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
