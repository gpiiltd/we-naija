import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import Icon from "../../Assets/SvgImagesAndIcons";
import DateModal from "../../Components/KYCpages/DateModal";
import FloatingSelect from "../../Components/Input/FloatingSelect";
import FloatingInput from "../../Components/Input/FloatingInput";
import { genderOptions, nationalityOptions } from "../../utils/selectOptions";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/Store/store";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";
import { capitalizeName } from "../../utils/inputValidations";
import { ClipLoader } from "react-spinners";
const BasicInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFirstName(capitalizeName(data.first_name || ""));
      setLastName(capitalizeName(data.last_name || ""));
      setNationality(data.nationality || "");
      setGender(capitalizeName(data.gender || ""));
      setDateOfBirth(data.date_of_birth || "");
    }
  }, [data]);

  const handleFullNameChange = (value: string) => {
    const names = value.split(" ");
    if (names.length >= 2) {
      setFirstName(names[0]);
      setLastName(names.slice(1).join(" "));
    } else {
      setFirstName(value);
      setLastName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDateSelect = (date: string) => {
    setDateOfBirth(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full p-6 bg-white rounded-lg mx-auto mb-12">
        <ClipLoader color="#007A61" size={24} className="mr-6" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center md:mt-4">
      <div className="w-full md:w-[50%] ">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/setting-mobile")
              }
            >
              <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
            </span>

            <Typography variant={TypographyVariant.SUBTITLE}>
              Basic Information
            </Typography>
          </div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-gray-500"
          >
            Edit your basic information{" "}
          </Typography>
        </div>
        <div className="pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <FloatingInput
              label="Full Name"
              value={`${firstName} ${lastName}`.trim()}
              onChange={handleFullNameChange}
              readOnly={true}
              error={
                (!firstName || !lastName) && error
                  ? "Full name is required."
                  : ""
              }
            />
            <FloatingSelect
              label="Gender"
              options={genderOptions.map((option) => ({
                value: option.value,
                label: option.name,
              }))}
              value={gender}
              onChange={setGender}
              error={gender === "" && error ? "Gender is required." : ""}
              readOnly={true}
            />
            <FloatingInput
              label="Date of birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              error={
                dateOfBirth === "" && error ? "Date of birth is required." : ""
              }
              readOnly={true}
              // onClick={() => setIsModalOpen(true)}
              icon={<Icon type="calendar" className="w-6 h-6" />}
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
              readOnly={true}
            />
          </form>
        </div>
      </div>

      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default BasicInfo;
