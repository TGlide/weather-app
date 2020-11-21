import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import "./styles.scss";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="container">
      <div className="search-bar">
        <SearchIcon />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Search;
