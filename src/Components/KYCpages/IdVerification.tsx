import React, { useState } from "react";
import { Button, Header, Typography } from "@gpiiltd/gpi-ui-library";
import logo from "../Assets/svgImages/logo.svg";
import { TypographyVariant } from "../types";
import { Errors } from "../types";
import Icon from "../../Assets/SvgImagesAndIcons";

const IDVerification = () => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({}); // State to hold validation errors

  const handleIdTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdType(e.target.value);
    setErrors({ ...errors, idType: "" }); // Clear error for ID type
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(e.target.value);
    setErrors({ ...errors, idNumber: "" }); // Clear error for ID number
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isFront: boolean
  ) => {
    const file = e.target.files?.[0] || null;
    if (isFront) {
      setFrontFile(file);
    } else {
      setBackFile(file);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!idType) newErrors.idType = "Please select an ID card type.";
    if (!idNumber) newErrors.idNumber = "ID number is required.";
    if (!frontFile)
      newErrors.frontFile = "Please upload the front of the ID card.";
    if (!backFile)
      newErrors.backFile = "Please upload the back of the ID card.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return;
    }
    console.log("Form Data:", { idType, idNumber, frontFile, backFile });
    // Proceed with form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg w-[50%] mt-10">
        <div className="flex items-center mb-4">
          <Icon type="idcard" className="w-10 h-10 mr-4" />

          <Typography variant={TypographyVariant.TITLE} className="">
            ID Verification
          </Typography>
        </div>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-left mb-6"
        >
          Kindly fill in your ID card details
        </Typography>

        {/* ID Card Type Selection */}
        <div className="mb-4 text-gray-500">
          <Typography variant={TypographyVariant.NORMAL} className="mb-2 text-black">
            Choose ID card type
          </Typography>
          <label className="block">
            <input
              type="radio"
              value="National ID"
              checked={idType === "National ID"}
              onChange={handleIdTypeChange}
            />
            National ID
          </label>
          <label className="block">
            <input
              type="radio"
              value="International passport"
              checked={idType === "International passport"}
              onChange={handleIdTypeChange}
            />
            International Passport
          </label>
          <label className="block">
            <input
              type="radio"
              value="Drivers licence"
              checked={idType === "Drivers licence"}
              onChange={handleIdTypeChange}
            />
            Drivers Licence
          </label>
          <label className="block">
            <input
              type="radio"
              value="Permanent voter card"
              checked={idType === "Permanent voter card"}
              onChange={handleIdTypeChange}
            />
            Permanent Voter Card
          </label>
          {errors.idType && (
            <p className="text-red-500 text-sm">{errors.idType}</p>
          )}
        </div>

        {/* ID Number Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={idNumber}
            onChange={handleIdNumberChange}
            className={`border ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            } rounded-md w-full h-12 p-2`}
            placeholder=" " // Add a space to trigger the floating effect
          />
          <label
            className={`absolute left-2 top-2 transition-all duration-200 transform ${
              idNumber ? "-top-4 left-2 text-teal-500" : "text-gray-500"
            }`}
          >
            Enter ID Number
          </label>
          {errors.idNumber && (
            <p className="text-red-500 text-sm">{errors.idNumber}</p>
          )}
        </div>

        {/* File Upload Instructions */}
        <Typography variant={TypographyVariant.NORMAL} className="mb-2">
          Upload a photo of your selected valid ID
        </Typography>
        <Typography variant={TypographyVariant.NORMAL} className="mb-4">
          1. Make sure the whole ID is in the frame.
          <br />
          2. The photo should clearly show the front of your ID - with no edges
          cut off.
          <br />
          3. Take the photo indoors to prevent glare or reflections.
        </Typography>

        {/* Front of ID Upload */}
        <div className="relative mb-4">
          <label className="block mb-1">Front of the ID card</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, true)}
            className="border border-gray-300 rounded-md w-full h-12 p-2"
          />
          {errors.frontFile && (
            <p className="text-red-500 text-sm">{errors.frontFile}</p>
          )}
        </div>

        {/* Back of ID Upload */}
        <div className="relative mb-4">
          <label className="block mb-1">Back of the ID card</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, false)}
            className="border border-gray-300 rounded-md w-full h-12 p-2"
          />
          {errors.backFile && (
            <p className="text-red-500 text-sm">{errors.backFile}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default IDVerification;
