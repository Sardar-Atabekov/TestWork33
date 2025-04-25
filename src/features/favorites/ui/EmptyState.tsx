import Link from 'next/link';
import { Heart } from 'lucide-react';

export const EmptyState = () => (
  <div className="empty-state">
    <Heart
      size={64}
      strokeWidth={2}
      fill="none"
      color="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <h3>No favorites yet</h3>
    <p>
      Search for cities on the home page and click the heart icon to add them to
      your favorites for quick access.
    </p>
    <Link href="/" className="btn btn-primary">
      Go to Home Page
    </Link>
  </div>
);
