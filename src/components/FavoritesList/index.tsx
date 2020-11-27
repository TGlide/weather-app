import React from "react";
import { City } from "../../entities/City";
import CityCard from "../CityCard";
import "./styles.scss";

interface FavoritesListProps {
  favorites: { [key: string]: City };
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <div className="container favorites-list">
      <h1>Favorites</h1>
      {Object.keys(favorites).length === 0 && (
        <div className={`no-favorites`} data-testid="empty-list">
          No favorites to show.
        </div>
      )}
      <div data-testid="city-list">
        {Object.entries(favorites).map(([key, city]) => (
          <CityCard city={city} key={key} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
