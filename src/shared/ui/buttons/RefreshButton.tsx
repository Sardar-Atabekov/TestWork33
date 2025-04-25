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
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
        Refresh
      </>
    )}
  </button>
);
