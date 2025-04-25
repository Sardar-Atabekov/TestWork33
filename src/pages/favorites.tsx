import { FavoritesList } from '@entities/favorites/ui/FavoritesList';

export default function FavoritesPage() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Your Favorite Cities</h1>
        <p>Quick access to weather in your saved locations</p>
      </div>
      <FavoritesList />
    </div>
  );
}
