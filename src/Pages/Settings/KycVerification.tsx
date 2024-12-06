import React, { useState } from "react";
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import { Errors } from "../../Components/types";
import FileUpload from "../../Components/KYCpages/FileUpload";
import { useNavigate } from "react-router-dom";
import VerificationCard from "../../Components/Home/VerificationCard";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import { AiOutlineDown } from "react-icons/ai";

const IDVerification = () => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
  };

  const idTypes = [
    "National ID",
    "International passport",
    "Drivers licence",
    "Permanent voter card",
  ];

  const [IdTypeDropdown, setIdTypeDropdown] = useState({
    selected: "",
    isOpen: false,
  });

  const handleIdTypeSelect = (state: string) => {
    setIdTypeDropdown({ selected: state, isOpen: false });
  };

  const handleFileChange = (file: File | null, isFront: boolean) => {
    if (isFront) {
      setFrontFile(file);
    } else {
      setBackFile(file);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string().required("ID number is required"),
  });

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

  return (
    <>
      <div className="flex flex-col items-center justify-center  mt-4">
        <div className="bg-white  rounded-lg w-full md:w-[50%] ">
          <div className="flex items-center mb-4">
            <h1 className="text-center md:mb-2 text-xl  md:text-2xl">
              KYC verification
            </h1>
          </div>

          <VerificationCard
            statusMessage="Completed"
            progressPercentage={100}
            responseTimeMessage=""
          />

          <Typography
            variant={TypographyVariant.NORMAL}
            className=" mt-8 font-semibold text-lg"
          >
            Identity card details
          </Typography>
          <div className="pt-2">
            <Formik
              initialValues={initialValues}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => {
                console.log("Form values:", values);
              }}
              validationSchema={validationSchema}
            >
              {({ isValid, dirty }) => (
                <Form className="flex flex-col gap-5">
                  <div className="relative">
                    {/* <label className="text-sm font-medium mb-1">By State</label> */}
                    <input
                      type="text"
                      value={IdTypeDropdown.selected}
                      placeholder="ID type"
                      readOnly
                      onClick={() =>
                        setIdTypeDropdown({
                          ...IdTypeDropdown,
                          isOpen: !IdTypeDropdown.isOpen,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-4 text-md focus:outline-teal-700  text-gray-400"
                    />
                    <div
                      className="absolute right-2 top-6 cursor-pointer text-gray-500"
                      onClick={() =>
                        setIdTypeDropdown({
                          ...IdTypeDropdown,
                          isOpen: !IdTypeDropdown.isOpen,
                        })
                      }
                    >
                      <AiOutlineDown size={20} />
                    </div>
                    {IdTypeDropdown.isOpen && (
                      <ul className="absolute w-full border border-gray-300 bg-white rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
                        {idTypes.map((state, index) => (
                          <li
                            key={index}
                            onClick={() => handleIdTypeSelect(state)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                          >
                            {state}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <InputField
                    placeHolder="Enter your full name"
                    type="text"
                    focusStyle="green"
                    label="ID Number"
                    name="idNumber"
                  />

                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className=" mt-8 font-semibold text-lg"
                  >
                    Identity card upload
                  </Typography>
                  <div className="relative mb-4">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="mb-2 "
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
                      variant={TypographyVariant.NORMAL}
                      className="mb-2 "
                    >
                      Back of the ID card
                    </Typography>
                    <FileUpload
                      label="Kindly upload it as an image or pdf"
                      onChange={(file) => handleFileChange(file, false)}
                      error={errors.backFile}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* <button
            onClick={handleSubmit}
            className="w-full bg-teal-700 text-white rounded-xl h-14 mt-8"
          >
            Submit
          </button> */}
        </div>
      </div>
    </>
  );
};

export default IDVerification;
