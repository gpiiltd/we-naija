import React, { useState } from "react";
import { Button, Header, Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import Icon from "../../Assets/SvgImagesAndIcons";
import DateModal from "./DateModal";
import { Errors } from "../types";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";


const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    address: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateSelect = (date: string) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    // if (!formData.dateOfBirth)
    //   newErrors.dateOfBirth = "Date of birth is required.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    navigate('/kyc/id-verification')
    console.log("Form Data:", formData);
    // Proceed with form submission logic here
  };

  return (
    <>
      <KycHeader />
      <div className="flex flex-col items-center justify-center min-h-screen ">
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

          <div className="">
            <div className="relative mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md w-full h-16 p-2 peer`}
                placeholder=" "
              />
              <label
                className={`absolute left-2 top-2 transition-all duration-200 transform ${
                  formData.address
                    ? "-top-[2px] left-2 text-gray-500 md:text-lg "
                    : "text-gray-500 text-2xl"
                }`}
              >
                Residential address
              </label>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div className="relative mb-4">
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`border ${
                  errors.nationality ? "border-red-500" : "border-gray-300"
                } rounded-md w-full h-16 p-1 peer`}
              >
                <option value="" disabled></option>
                <option value="nationality1">Nationality 1</option>
                <option value="nationality2">Nationality 2</option>
                <option value="nationality3">Nationality 3</option>
              </select>
              <label
                className={`absolute left-2 top-2 transition-all duration-200 transform ${
                  formData.nationality
                    ? "-top-[2px] left-2 text-gray-500 md:text-lg "
                    : "text-gray-500 text-2xl"
                }`}
              >
                Nationality
              </label>
              {errors.nationality && (
                <p className="text-red-500 text-sm">{errors.nationality}</p>
              )}
            </div>

            <div className="relative mb-4">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-md w-full h-16 p-1 peer`}
              >
                <option value="" disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                className={`absolute left-2 top-2 transition-all duration-200 transform ${
                  formData.gender
                    ? "-top-[2px] left-2 text-gray-500 md:text-lg "
                    : "text-gray-500 text-2xl"
                }`}
              >
                Gender
              </label>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onClick={() => setIsModalOpen(true)} // Open modal on click
                readOnly
                placeholder=" " // Add a space to trigger the floating effect
                className="border border-gray-300 rounded-md w-full h-16 p-1 peer"
              />
              <label
                className={`absolute left-2 top-2 transition-all duration-200 transform ${
                  formData.dateOfBirth
                    ? "-top-[2px] left-2 text-gray-500 md:text-lg "
                    : "text-gray-500 text-2xl"
                }`}
              >
                Date of birth
              </label>
              <Icon
                type="calendar"
                className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2"
              />
              {/* {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
              )} */}
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full bg-teal-500 text-white h-16 rounded-xl mt-4 ${
                Object.keys(errors).length > 0
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Proceed
            </button>
          </div>

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
