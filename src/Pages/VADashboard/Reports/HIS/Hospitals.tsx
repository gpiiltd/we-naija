import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Typography from "../../../../Components/Typography";
import { TypographyVariant } from "../../../../Components/types";
import SearchBar from "../../../../Components/Searchbar";
import ButtonComponent from "../../../../Components/ButtonComponent";
import { CiLocationOn } from "react-icons/ci";

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const suggestions = ["apple", "banana", "orange", "grape"];

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted with:", query);
  };

  return (
    <div>
      <div className="flex gap-3 flex-col justify-center">
        <div className="flex gap-3 items-center">
          <div onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={24} className="cursor-pointer" />
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-black font-extrabold"
          >
            Health institutes survey
          </Typography>
        </div>
        <div className="flex justify-between w-full">
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-light_gray"
          >
            Select a health institute to submit a survey report today and earn
            star points
          </Typography>
          <div className="flex gap-1 justify-center">
            <SearchBar
              placeholder="Search for a clinic or hospital..."
              value={searchQuery}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              suggestions={suggestions}
            />
            <ButtonComponent
              text="Location"
              bg_color="#007A61"
              active={true}
              text_color="#FFFFFF"
              icon={<CiLocationOn size={30} />}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 py-6 pb-48 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Content here */}
      </div>
    </div>
  );
};

export default Hospitals;
