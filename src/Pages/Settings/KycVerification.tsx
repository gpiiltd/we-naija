import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";
import { RiDeleteBin6Line } from "react-icons/ri";

const IDVerification = () => {
  const dispatch = useDispatch();
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [errors] = useState<Errors>({});

  const navigate = useNavigate();
  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setIdType(data.id_type || "");
      setIdNumber(data.id_number || "");
      setFrontImageUrl(data.id_front || "");
      setBackImageUrl(data.id_back || "");
    }
  }, [data]);

  const initialValues = {
    fullName: "",
    email: "",
  };

  console.log(frontFile, backFile);

  const idTypes = ["International passport"];

  const handleFileChange = (file: File | null, isFront: boolean) => {
    if (isFront) {
      setFrontFile(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFrontImageUrl(imageUrl);
      }
    } else {
      setBackFile(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setBackImageUrl(imageUrl);
      }
    }
  };

  const handleDeleteImage = (isFront: boolean) => {
    if (isFront) {
      setFrontFile(null);
      setFrontImageUrl("");
    } else {
      setBackFile(null);
      setBackImageUrl("");
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string().required("ID number is required"),
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

  const renderImagePreview = (imageUrl: string, onDelete: () => void) => {
    return (
      <section className="flex justify-between items-center w-full border border-primary_green rounded-lg p-3">
        <div className="flex gap-2 items-center">
          <Icon type="imageUploadIcon" />
          <div className="flex flex-col gap-1">
            <img
              src={imageUrl}
              alt="ID Card"
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        </div>
        <RiDeleteBin6Line
          onClick={onDelete}
          className="cursor-pointer text-red-500 hover:text-red-700"
        />
      </section>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center  md:mt-4 mb-8">
        <div className="bg-white  rounded-lg w-full md:w-[50%] ">
          <div className="flex items-center mb-4">
            <div className="flex">
              <span
                onClick={() =>
                  navigate("/verified-agent-dashboard/settings/setting-mobile")
                }
              >
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
              {() => (
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
                      className="mb-2"
                    >
                      Front of the ID card
                    </Typography>

                    {frontImageUrl ? (
                      renderImagePreview(frontImageUrl, () =>
                        handleDeleteImage(true),
                      )
                    ) : (
                      <FileUpload
                        label="Kindly upload it as an image or pdf"
                        onChange={(file) => handleFileChange(file, true)}
                        error={errors.frontFile}
                      />
                    )}

                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="mb-2 mt-4"
                    >
                      Back of the ID card
                    </Typography>
                    {backImageUrl ? (
                      renderImagePreview(backImageUrl, () =>
                        handleDeleteImage(false),
                      )
                    ) : (
                      <FileUpload
                        label="Kindly upload it as an image or pdf"
                        onChange={(file) => handleFileChange(file, false)}
                        error={errors.backFile}
                      />
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDVerification;
