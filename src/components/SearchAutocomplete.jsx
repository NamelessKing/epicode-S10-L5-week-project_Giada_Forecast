import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchCities } from "../services/weatherAPI";

const SearchAutocomplete = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        const results = await searchCities(query);
        setSuggestions(results);
        setShowDropdown(true);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Click fuori dal dropdown per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleCitySelect = (city) => {
    const cityName = city.local_names?.it || city.name;
    setQuery(cityName);
    setShowDropdown(false);
    // Passa un oggetto con coordinate e nome
    onCitySelect({ lat: city.lat, lon: city.lon, name: cityName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleCitySelect(suggestions[selectedIndex]);
      } else {
        onCitySelect(query.trim());
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleCitySelect(suggestions[selectedIndex]);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-autocomplete-wrapper" ref={dropdownRef}>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4 mb-lg-5">
          <Form.Label className="homepage-label">Cerca una città</Form.Label>
          <div className="d-flex gap-2 gap-lg-3 position-relative">
            <Form.Control
              ref={inputRef}
              type="text"
              className="homepage-input"
              size="lg"
              placeholder="es. Milano, Parigi, Tokyo..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button
              className="px-3 px-md-4 px-lg-5 homepage-search-btn btn btn-primary btn-lg"
              type="submit"
            >
              <Search className="search-icon" />
            </button>

            {/* Dropdown Suggestions */}
            {showDropdown && (
              <div className="autocomplete-dropdown">
                {isLoading ? (
                  <div className="autocomplete-item loading">
                    Caricamento...
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((city, index) => (
                    <div
                      key={`${city.lat}-${city.lon}`}
                      className={`autocomplete-item ${
                        index === selectedIndex ? "selected" : ""
                      }`}
                      onClick={() => handleCitySelect(city)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="city-name">
                        {city.local_names?.it || city.name}
                      </div>
                      <div className="city-details">
                        {city.state && `${city.state}, `}
                        {city.country}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="autocomplete-item no-results">
                    Nessuna città trovata
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SearchAutocomplete;
