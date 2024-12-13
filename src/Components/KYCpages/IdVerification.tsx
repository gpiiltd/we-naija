import React, { useState } from "react";
import { Button, Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../types";
import { Errors } from "../types";
import Icon from "../../Assets/SvgImagesAndIcons";
import FileUpload from "./FileUpload";
import SkipButton from "./SkipButton";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Modal";

const IDVerification = () => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  // eslint-disable-next-line
  const [frontFile, setFrontFile] = useState<File | null>(null);
  // eslint-disable-next-line
  const [backFile, setBackFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 3000);
  };

  return (
    <>
      <KycHeader />
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-2 md:p-8 rounded-lg md:w-[50%] mt-10">
          <div className="flex items-center mb-4">
            <Icon type="idcard" className="w-10 h-10 mr-4" />

            <h1 className="text-center md:mb-4 text-xl  md:text-3xl">
              ID Verification
            </h1>
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

          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="mb-4 mt-8"
          >
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
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="mb-2 mt-8"
          >
            Upload a photo of your selected valid ID
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="mb-4 text-gray-500"
          >
            1. Make sure the whole ID is in the frame.
            <br />
            2. The photo should clearly show the front of your ID - with no
            edges cut off.
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

        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-6 pb-6 px-8">
            <div className="flex flex-col justify-center items-center pt-6">
              <Icon type="success" />

              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-black pt-3 font-extrabold"
              >
                KYC successful submitted{" "}
              </Typography>
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray pt-4"
              >
                Great job!
              </Typography>
            </div>{" "}
            <Button
              text="Proceed to dashboard"
              active={true}
              bg_color="#007A61"
              text_color="white"
              loading={loading}
              onClick={() => {
                setShowModal(false);
                navigate("/verified-agent-dashboard");
              }}
            />
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default IDVerification;
