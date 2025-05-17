import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.scss';
import SearchButton from '@shared/ui/searchButton/SearchButton';

interface SearchBarProps {
  defaultValue?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  defaultValue = '',
  autoFocus = false,
}: SearchBarProps) => {
  const [city, setCity] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = city.trim();

      if (!trimmed) return;

      await router.push(`/?city=${encodeURIComponent(trimmed)}`);
    },
    [city, router]
  );

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <div className="input-group mb-3">
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., London, Moscow, Tokyo)"
          className="form-control"
          aria-label="City name"
          required
        />
        <SearchButton isPending={false} disabled={!city.trim()} />
      </div>
    </form>
  );
};

export default SearchBar;
