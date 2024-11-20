import React, { useState } from "react";
import { Button, Header, Typography } from "@gpiiltd/gpi-ui-library";
import logo from "../Assets/svgImages/logo.svg";
import { TypographyVariant } from "../types";
import { Errors } from "../types";
import Icon from "../../Assets/SvgImagesAndIcons";
import FileUpload from "./FileUpload";
import SkipButton from "./SkipButton";

const IDVerification = () => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const handleIdTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdType(e.target.value);
    setErrors({ ...errors, idType: "" });
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(e.target.value);
    setErrors({ ...errors, idNumber: "" });
  };

  const handleFileChange = (file: File | null, isFront: boolean) => {
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
      setErrors(validationErrors);
      return;
    }
    console.log("Form Data:", { idType, idNumber, frontFile, backFile });
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
          className="text-left mb-6 text-gray-500"
        >
          Kindly fill in your ID card details
        </Typography>

        <div className="mb-4">
          <Typography variant={TypographyVariant.SUBTITLE} className="mb-2 ">
            Choose ID card type
          </Typography>
          {[
            "National ID",
            "International passport",
            "Drivers licence",
            "Permanent voter card",
          ].map((type) => (
            <label key={type} className="flex items-center mb-4">
              <input
                type="radio"
                value={type}
                checked={idType === type}
                onChange={handleIdTypeChange}
                className="hidden"
              />
              <span
                className={`inline-block w-6 h-6 border-2 border-gray-300 rounded-full mr-2 cursor-pointer  ${
                  idType === type ? "bg-green-700 border-green-700" : ""
                }`}
              ></span>
              <Typography
                variant={TypographyVariant.NORMAL}
                className={`${
                  idType === type ? "text-black" : "text-gray-500"
                }`}
              >
                {type}
              </Typography>
            </label>
          ))}
          {errors.idType && (
            <p className="text-red-500 text-sm">{errors.idType}</p>
          )}
        </div>

        <Typography variant={TypographyVariant.SUBTITLE} className="mb-4 mt-8">
          Enter ID Number
        </Typography>
        <input
          type="text"
          value={idNumber}
          onChange={handleIdNumberChange}
          className={`border ${
            errors.idNumber ? "border-red-500" : "border-gray-300"
          } rounded-md w-full h-12 p-2`}
          placeholder="ID Number"
        />

        {errors.idNumber && (
          <p className="text-red-500 text-sm">{errors.idNumber}</p>
        )}

        {/* File Upload Instructions */}
        <Typography variant={TypographyVariant.SUBTITLE} className="mb-2 mt-8">
          Upload a photo of your selected valid ID
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="mb-4 text-gray-500"
        >
          1. Make sure the whole ID is in the frame.
          <br />
          2. The photo should clearly show the front of your ID - with no edges
          cut off.
          <br />
          3. Take the photo indoors to prevent glare or reflections.
        </Typography>

        <div className="relative mb-4">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="mb-2 mt-8"
          >
            Front of the ID card
          </Typography>

          {/* File Uploads */}
          <FileUpload
            label="Kindly upload it as an image or pdf"
            onChange={(file) => handleFileChange(file, true)}
            error={errors.frontFile}
          />

          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="mb-2 mt-8"
          >
            Back of the ID card
          </Typography>
          <FileUpload
            label="Kindly upload it as an image or pdf"
            onChange={(file) => handleFileChange(file, false)}
            error={errors.backFile}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-700 text-white rounded-xl h-14 mt-8"
        >
          Submit
        </button>

        <div className="flex pt-4 items-center justify-center">
          <SkipButton />
        </div>
      </div>
    </div>
  );
};

export default IDVerification;
