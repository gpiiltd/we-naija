import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import Icon from "../../Assets/SvgImagesAndIcons";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../Input/FloatingInput";
import FloatingSelect from "../Input/FloatingSelect";
import { genderOptions } from "../../utils/selectOptions";
import { nationalityOptions } from "../../utils/selectOptions";
import { setKycPersonalInfo } from "../../redux/Slices/user/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/Store/store";
import CustomDatePicker from "./CustomDatePicker";

const PersonalInfo = () => {
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date || new Date());
  };

  const isFormComplete =
    address !== "" && nationality !== "" && gender !== "" && dateOfBirth !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      setError(".");
      return;
    }

    const formattedDate = `${dateOfBirth?.getFullYear()}-${String(
      dateOfBirth?.getMonth() + 1
    ).padStart(2, "0")}-${String(dateOfBirth?.getDate()).padStart(2, "0")}`;
    setDateOfBirth(new Date(formattedDate));

    dispatch(
      setKycPersonalInfo({
        address,
        nationality,
        gender,
        dateOfBirth: formattedDate,
      })
    );

    navigate("/kyc/id-verification");
  };

  return (
    <>
      <KycHeader />
      <div className="flex flex-col items-center justify-center mt-12  ">
        <div className="bg-white w-full p-4 md:p-8 rounded-lg md:w-2/4 ">
          <div className="flex  mb-4">
            <Icon type="person" className="w-6 h-6 mr-4" />

            <h1 className="text-center md:mb-4 text-xl  md:text-3xl">Personal Information</h1>
          </div>

          <Typography variant={TypographyVariant.NORMAL} className=" mb-6 text-gray-500">
            Kindly fill in your details
          </Typography>

          <form onSubmit={handleSubmit} className=" ">
            <FloatingInput
              label="Residential address"
              value={address}
              onChange={setAddress}
              error={address === "" && error ? "Address is required." : ""}
            />
            <FloatingSelect
              label="Nationality"
              options={nationalityOptions}
              value={nationality}
              onChange={setNationality}
              error={nationality === "" && error ? "Nationality is required." : ""}
            />
            <FloatingSelect
              label="Gender"
              options={genderOptions.map((option) => option.name)}
              value={genderOptions.find((option) => option.value === gender)?.name || ""}
              onChange={(selectedOption) => {
                const selectedGender = genderOptions.find(
                  (option) => option.name === selectedOption
                );
                if (selectedGender) {
                  setGender(selectedGender.value);
                }
              }}
              error={gender === "" && error ? "Gender is required." : ""}
            />
            <CustomDatePicker selectedDate={dateOfBirth} onChange={handleDateChange} />
            <button
              type="submit"
              className={`mt-12 w-full py-4 rounded-md bg-primary_green  text-white ${
                isFormComplete ? "hover:bg-[#015443]" : "cursor-not-allowed opacity-50"
              }`}
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
    </>
  );
};

export default PersonalInfo;
