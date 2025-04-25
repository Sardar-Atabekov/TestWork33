import { RefreshCw } from 'lucide-react';
import styles from './buttons.module.scss';

type Props = {
  onClick: () => void;
  loading?: boolean;
};

export const RefreshButton = ({ onClick, loading }: Props) => (
  <button
    className={`btn btn-outline-primary me-2 ${styles.button}`}
    onClick={onClick}
    disabled={loading}
  >
    {loading ? (
      'Refreshing...'
    ) : (
      <>
        <RefreshCw
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
        Refresh
      </>
    )}
  </button>
);
