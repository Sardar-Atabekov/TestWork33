import { Search } from 'lucide-react';

interface SearchButtonProps {
  isPending: boolean;
  disabled?: boolean;
}

const SearchButton = ({ isPending, disabled = false }: SearchButtonProps) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={disabled}>
      {isPending ? (
        <span
          className="spinner-border spinner-border-sm me-1"
          role="status"
          aria-hidden="true"
        />
      ) : (
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
      )}
      Search
    </button>
  );
};

export default SearchButton;
