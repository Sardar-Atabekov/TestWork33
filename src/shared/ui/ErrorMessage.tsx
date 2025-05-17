import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="alert alert-danger my-4" role="alert" aria-live="assertive">
      <div className="d-flex align-items-center">
        <AlertTriangle
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="me-2"
        />
        <strong>Error: </strong>&nbsp;{message}
      </div>
    </div>
  );
};

export default ErrorMessage;
