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
import { RootState } from "../../redux/Store/store";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";

const BasicInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setUsername(data.username || "");
      setNationality(data.nationality || "");
      setGender(data.gender || "");
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

  const isFormComplete =
    firstName !== "" &&
    lastName !== "" &&
    nationality !== "" &&
    gender !== "" &&
    dateOfBirth !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update profile functionality
  };

  const handleDateSelect = (date: string) => {
    setDateOfBirth(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start gap-10 md:mx-32 md:mt-4">
      <div className="hidden md:flex gap-2 w-32 h-32 bg-white items-center justify-center rounded-xl border border-gray-200">
        <Icon type="avatarv" className="w-20 h-20" />
      </div>
      <div className="w-full md:w-[60%] lg:mr-80">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span onClick={() => navigate("/verified-agent-dashboard/settings/setting-mobile")}>
              <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
            </span>

            <Typography variant={TypographyVariant.SUBTITLE}>Basic Information</Typography>
          </div>
          <Typography variant={TypographyVariant.SMALL} className="text-gray-500">
            Edit your basic information{" "}
          </Typography>
        </div>
        <div className="pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <FloatingInput
              label="Full Name"
              value={`${firstName} ${lastName}`.trim()}
              onChange={handleFullNameChange}
              error={(!firstName || !lastName) && error ? "Full name is required." : ""}
            />
            <FloatingInput
              label="User Name"
              value={userName}
              onChange={setUsername}
              error={userName === "" && error ? "User name is required." : ""}
            />
            <FloatingSelect
              label="Gender"
              options={genderOptions.map((option) => option.name)}
              value={gender}
              onChange={setGender}
              error={gender === "" && error ? "Gender is required." : ""}
            />
            <FloatingInput
              label="Date of birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              error={dateOfBirth === "" && error ? "Date of birth is required." : ""}
              readOnly={true}
              onClick={() => setIsModalOpen(true)}
              icon={<Icon type="calendar" className="w-6 h-6" />}
            />
            <FloatingSelect
              label="Nationality"
              options={nationalityOptions}
              value={nationality}
              onChange={setNationality}
              error={nationality === "" && error ? "Nationality is required." : ""}
            />
            <button
              type="submit"
              className={`mt-4 w-full py-4 rounded-md ${
                isFormComplete
                  ? "bg-[#007A61] hover:bg-[#015443] text-white"
                  : "bg-[#007A61] text-white cursor-not-allowed opacity-50"
              }`}
            >
              Save changes
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
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
