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
        <div className={`no-favorites`}>No favorites to show.</div>
      )}
      {Object.entries(favorites).map(([key, city]) => (
        <CityCard city={city} key={key} />
      ))}
    </div>
  );
};

export default FavoritesList;
