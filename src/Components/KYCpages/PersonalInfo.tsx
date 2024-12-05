import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import Icon from "../../Assets/SvgImagesAndIcons";
import DateModal from "./DateModal";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../Input/FloatingInput";
import FloatingSelect from "../Input/FloatingSelect";

const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const handleDateSelect = (date: string) => {
    setDateOfBirth(date);
  };

  const nationalityOptions = [
    "American",
    "Canadian",
    "British",
    "Australian",
    "Indian",
    "Chinese",
    "Brazilian",
    "French",
    "German",
    "Japanese",
  ];

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", { name, nationality, gender, dateOfBirth });
    navigate("/kyc");
  };

  const isFormComplete = name !== "" && nationality !== "" && gender !== "";

  const handleButtonClick = () => {
    if (!isFormComplete) {
      setError(".");
    }
  };

  return (
    <>
      <KycHeader />
      <div className="flex flex-col items-center justify-center mt-12 md:mt-24 ">
        <div className="bg-white w-full p-4 md:p-8 rounded-lg md:w-2/4 ">
          <div className="flex items-center mb-4">
            <Icon type="person" className="w-6 h-6 mr-4" />

            <h1 className="text-center md:mb-4 text-xl  md:text-3xl">
              Personal Information
            </h1>
          </div>

          <Typography
            variant={TypographyVariant.NORMAL}
            className=" mb-6 text-gray-500"
          >
            Kindly fill in your details
          </Typography>

          <form onSubmit={handleSubmit} className=" ">
            <FloatingInput
              label="Residential address"
              value={name}
              onChange={setName}
              error={name === "" && error ? "Address is required." : ""}
            />
            <FloatingSelect
              label="Nationality"
              options={nationalityOptions}
              value={nationality}
              onChange={setNationality}
              error={
                nationality === "" && error ? "Nationality is required." : ""
              }
            />
            <FloatingSelect
              label="Gender"
              options={genderOptions}
              value={gender}
              onChange={setGender}
              error={gender === "" && error ? "Gender is required." : ""}
            />
            <FloatingInput
              label="Date of birth"
              // type="date"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              error={
                dateOfBirth === "" && error ? "Date of birth is required." : ""
              }
              readOnly={true}
              onClick={() => setIsModalOpen(true)}
              icon={<Icon type="calendar" className="w-6 h-6" />}
            />
            <button
              type="submit"
              className={`mt-4 w-full py-4 rounded-md ${
                isFormComplete
                  ? "bg-[#007A61] hover:bg-[#007A61] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleButtonClick} //
              // disabled={!isFormComplete} // Disable button if form is not complete
            >
              Poceed
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}{" "}
          </form>

          <div className="flex pt-4 items-center justify-center">
            <SkipButton />
          </div>
        </div>
      </div>
      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </>
  );
};

export default PersonalInfo;
