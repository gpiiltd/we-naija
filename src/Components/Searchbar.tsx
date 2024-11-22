import React, { useState, useEffect } from 'react';
import { SearchBarProps } from './types';

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

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

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
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={searchTerm} 
          onChange={handleInputChange}
          placeholder={selectedPlaceholder}
          className="py-2 pl-10 text-sm text-primary_color rounded-lg border border-primary_color focus:outline-none focus:ring-1 focus:ring-primary_color w-[20rem]"
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
            stroke="lightgray"
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
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
