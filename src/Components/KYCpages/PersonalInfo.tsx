import React, { useEffect, useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/SvgImagesAndIcons";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../Input/FloatingInput";
import FloatingSelect from "../Input/FloatingSelect";
import { genderOptions, allNigerianStates } from "../../utils/selectOptions";
import { nationalityOptions } from "../../utils/selectOptions";
import { setKycPersonalInfo } from "../../redux/Slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/Store/store";
import CustomDatePicker from "./CustomDatePicker";
import { triggerGetLocation } from "../../redux/Services/settings/settingsServices";

const PersonalInfo = () => {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [dateError, setDateError] = useState("");
  const [lgaDataOptions, setLgaDataOptions] = useState<
    { id: string; name: string }[]
  >([]);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const { locationData } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (state) {
      const selectedState = Array.isArray(allNigerianStates)
        ? allNigerianStates
            .flat()
            .find((option) => option.name.toString() === state)
        : undefined;
      if (selectedState) {
        dispatch(triggerGetLocation(selectedState.id));
      }
    } else {
      setLgaDataOptions([]);
    }
  }, [dispatch, state]);

  useEffect(() => {
    if (locationData.data) {
      setLgaDataOptions(locationData.data);
    }
  }, [locationData]);

  const isOver18 = (date: Date): boolean => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
  };

  const handleApply = (date: Date | null) => {
    if (!date) {
      setDateOfBirth(null);
      setDateError("");
      return;
    }

    setDateOfBirth(date);

    if (!isOver18(date)) {
      setDateError("You must be at least 18 years old");
    } else {
      setDateError("");
    }
  };

  const isFormComplete =
    address !== "" &&
    state !== "" &&
    lga !== "" &&
    nationality !== "" &&
    gender !== "" &&
    dateOfBirth !== null &&
    !dateError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedState = allNigerianStates
      .flat()
      .find((option) => option?.name.toString() === state);

    const selectedLga = lgaDataOptions.find(
      (option) => option.name.toString() === lga,
    );

    if (!isFormComplete) {
      setError(".");
      return;
    }

    const formattedDate = `${dateOfBirth?.getFullYear()}-${String(
      dateOfBirth?.getMonth() + 1,
    ).padStart(2, "0")}-${String(dateOfBirth?.getDate()).padStart(2, "0")}`;

    dispatch(
      setKycPersonalInfo({
        address,
        state_id: selectedState?.id,
        lga_id: selectedLga?.id,
        nationality,
        gender,
        dateOfBirth: formattedDate,
      }),
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
              value={address}
              onChange={setAddress}
              error={address === "" && error ? "Address is required." : ""}
            />
            <FloatingSelect
              label="State"
              options={
                Array.isArray(allNigerianStates)
                  ? allNigerianStates.flat().map((option) => ({
                      value: option.id.toString(),
                      label: option.name,
                    }))
                  : [
                      {
                        value: "",
                        label: "Select State",
                      },
                    ]
              }
              value={state}
              onChange={setState}
              error={state === "" && error ? "State is required." : ""}
            />

            <FloatingSelect
              label="LGA"
              options={
                Array.isArray(lgaDataOptions)
                  ? lgaDataOptions.map((option) => ({
                      value: option.id.toString(),
                      label: option.name,
                    }))
                  : [
                      {
                        value: "",
                        label: "Select LGA",
                      },
                    ]
              }
              value={lga}
              onChange={setLga}
              error={lga === "" && error ? "LGA is required." : ""}
            />

            <FloatingSelect
              label="Nationality"
              options={nationalityOptions.map((option) => ({
                value: option.value,
                label: option.name,
              }))}
              value={nationality}
              onChange={setNationality}
              error={
                nationality === "" && error ? "Nationality is required." : ""
              }
            />
            <FloatingSelect
              label="Gender"
              options={genderOptions.map((option) => ({
                value: option.value,
                label: option.name,
              }))}
              value={gender}
              onChange={(selectedOption) => {
                const selectedGender = genderOptions.find(
                  (option) => option.name === selectedOption,
                );
                if (selectedGender) {
                  setGender(selectedGender.value);
                }
              }}
              error={gender === "" && error ? "Gender is required." : ""}
            />
            <div className="mb-4">
              <CustomDatePicker
                selectedDate={dateOfBirth}
                onApply={handleApply}
                error={dateError}
              />
              {dateError && (
                <p className="text-error text-xs mt-1">{dateError}</p>
              )}
            </div>
            <div className="relative z-0">
              <button
                type="submit"
                className={`mt-12 w-full py-4 rounded-md bg-primary_green text-white ${
                  isFormComplete
                    ? "hover:bg-[#015443]"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                Proceed
              </button>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
