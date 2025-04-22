import React, { useState, useEffect, useRef } from "react";
import { SearchBarProps } from "./types";
import { IoMdCheckmark } from "react-icons/io";

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChange,
  onSubmit,
  suggestions = [],
  value = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState(placeholder);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setIsFocused(true);
    if (onChange) onChange(newSearchTerm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit(searchTerm);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedPlaceholder(suggestion);
    setSearchTerm(suggestion);
    setIsFocused(false);
    setSelectedSuggestion(suggestion);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative" ref={searchBarRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={selectedPlaceholder}
          className="py-2 pl-10 text-sm text-text-black border border-primary_color rounded-lg focus:outline-none focus:ring-1 focus:ring-primary_color w-[20rem]"
          onFocus={() => setIsFocused(true)}
        />
        <button
          type="submit"
          className="absolute ml-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#667085"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      {isFocused && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white shadow-md w-full rounded-lg py-2 mt-2">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`flex justify-between hover:bg-highlight_green items-center px-4 py-2 ${
                selectedSuggestion === suggestion ? "bg-highlight_green" : ""
              }`}
            >
              <li
                className="text-black cursor-pointer"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>

              {selectedSuggestion === suggestion && (
                <IoMdCheckmark color="#007A61" />
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
