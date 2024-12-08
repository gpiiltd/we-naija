import React, { useState } from "react";
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import { Errors } from "../../Components/types";
import FileUpload from "../../Components/KYCpages/FileUpload";
import { useNavigate } from "react-router-dom";
import VerificationCard from "../../Components/Home/VerificationCard";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FloatingSelect from "../../Components/Input/FloatingSelect";
import FloatingInput from "../../Components/Input/FloatingInput";
import Icon from "../../Assets/SvgImagesAndIcons";

const IDVerification = () => {
  const [idType, setIdType] = useState("International passport");
  const [idNumber, setIdNumber] = useState("2457369875216");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
  };

  const idTypes = [
    "International passport"
  ];

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



  return (
    <>
      <div className="flex flex-col items-center justify-center  md:mt-4 mb-8">
        <div className="bg-white  rounded-lg w-full md:w-[50%] ">
          <div className="flex items-center mb-4">
          <div className="flex">
            <span onClick={() => navigate("/verified-agent-dashboard/settings/setting-mobile")}>
            <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
            </span>

            <Typography variant={TypographyVariant.SUBTITLE}>
              KYC Verification
            </Typography>
          </div>
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
                  <FloatingSelect
                    label="ID Type"
                    options={idTypes}
                    value={idType}
                    onChange={setIdType}
                  />

                  <FloatingInput
                    label="ID Number"
                    value={idNumber}
                    onChange={setIdNumber}
                  />

                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className=" mt-4 font-semibold text-lg"
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
