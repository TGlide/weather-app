import React from "react";
import { useStoreState } from "../../store";
import CityCard from "../CityCard";
import "./styles.scss";

interface FavoritesListProps {}

const FavoritesList: React.FC<FavoritesListProps> = () => {
  const favorites = useStoreState((state) => state.favorites.data);
  return (
    <div className="container favorites-list">
      <h1>Favorites</h1>
      {Object.entries(favorites).map(([key, city]) => (
        <CityCard city={city} key={key} />
      ))}
    </div>
  );
};

export default FavoritesList;
