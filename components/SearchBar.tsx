import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "../styles/SearchBar.module.scss";

interface SearchBarProps {
  onSearch?: (city: string) => void;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, defaultValue = "" }: SearchBarProps) => {
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

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name (e.g., London, Moscow, Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!city.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-1"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
