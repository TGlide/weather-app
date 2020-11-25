import React, { useState } from "react";
import { searchLocations } from "../../api/searchLocations";
import { LocationResponse } from "../../api/types/LocationResponse";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import "./styles.scss";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [searchInput, setSearchInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [searchResults, setSearchResults] = useState<
    LocationResponse | string | undefined
  >(undefined);

  const handleSearch = async (input: string | undefined) => {
    if (!input) return;
    const handleError = () => {
      setSearchResults("Couldn't find any locations.");
    };

    try {
      const resp = await searchLocations(input);
      if (resp.data.results.length === 0) handleError();
      else setSearchResults(resp.data);
    } catch {
      handleError();
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setSearchResults(undefined);
    setSearchInput(e.target.value);
    setTypingTimeout(
      setTimeout(() => {
        setTypingTimeout(undefined);
        handleSearch(e.target.value);
      }, 1000)
    );
  };

  const renderSearchResults = () => {
    if (searchResults === undefined) {
      return <div className="searching">Searching...</div>;
    }

    if (typeof searchResults === "string") {
      return <div className="searching">{searchResults}</div>;
    }

    return (
      <div className="results-list">
        {searchResults.results.map((result) => {
          return (
            <div key={result?.annotations?.geohash}>{result?.formatted}</div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container search-container">
      <div className={`search-bar ${searchInput && "searching"}`}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      {searchInput && (
        <div className="search-results">
          <div className="search-results-card">{renderSearchResults()}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
