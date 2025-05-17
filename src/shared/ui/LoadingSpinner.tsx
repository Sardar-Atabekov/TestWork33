import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  message = 'Loading...',
}: LoadingSpinnerProps) => {
  const spinnerSize = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg',
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center p-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={`spinner-border text-primary ${spinnerSize[size]}`}>
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
