import React, { useState } from "react";
import { searchLocations } from "../../api/searchLocations";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { City } from "../../entities/City";
import { Location } from "../../entities/Location";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useStoreActions } from "../../store";
import "../../styles/layout.scss";
import "./styles.scss";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [searchInput, setSearchInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [searchResults, setSearchResults] = useState<
    Location[] | string | undefined
  >(undefined);

  const setSelectedCity = useStoreActions(
    (actions) => actions.selectedCity.set
  );

  const { ref, isComponentVisible } = useComponentVisible(false);

  const handleSearch = async (input: string | undefined) => {
    if (!input) return;
    const handleError = () => {
      setSearchResults("Couldn't find any locations.");
    };

    try {
      const resp = await searchLocations(input);
      if (resp.data.results.length === 0) handleError();
      else
        setSearchResults(
          resp.data.results.map((result) => Location.fromLocationResult(result))
        );
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

    const usedKeys: string[] = [];

    return (
      <div className="results-list">
        {searchResults.map((result) => {
          if (usedKeys.includes(Location.getKey(result))) return null;
          usedKeys.push(Location.getKey(result));

          return (
            <div
              key={Location.getKey(result)}
              onClick={() => setSelectedCity(new City(result))}
            >
              {result.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container search-container" ref={ref}>
      <div
        className={`search-bar ${searchInput && "searching"} ${
          isComponentVisible && "active"
        }`}
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      {searchInput && isComponentVisible && (
        <div className="search-results">
          <div className="search-results-card">{renderSearchResults()}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
