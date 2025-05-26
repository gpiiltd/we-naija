import React, { useState, useEffect } from "react";
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import { useNavigate } from "react-router-dom";
import VerificationCard from "../../Components/Home/VerificationCard";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FloatingSelect from "../../Components/Input/FloatingSelect";
import FloatingInput from "../../Components/Input/FloatingInput";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store/store";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";

const IDVerification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");

  const navigate = useNavigate();
  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
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

  const idTypes = [{ name: "National ID", value: "national_id" }];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string().required("ID number is required"),
  });

  const handleImageClick = (url: string) => {
    setModalImageUrl(url);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

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
                    options={idTypes.map((option) => ({
                      value: option.value,
                      label: option.name,
                    }))}
                    value={idType}
                    onChange={setIdType}
                    readOnly={true}
                  />

                  <FloatingInput
                    label="ID Number"
                    value={idNumber}
                    onChange={setIdNumber}
                    readOnly={true}
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
                      <img
                        src={frontImageUrl}
                        alt="Front of ID Card"
                        className="w-40 h-40 object-cover rounded border cursor-pointer"
                        onClick={() => handleImageClick(frontImageUrl)}
                      />
                    ) : (
                      <Typography
                        variant={TypographyVariant.SMALL}
                        className="text-gray-400"
                      >
                        No front image available.
                      </Typography>
                    )}

                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="mb-2 mt-4"
                    >
                      Back of the ID card
                    </Typography>
                    {backImageUrl ? (
                      <img
                        src={backImageUrl}
                        alt="Back of ID Card"
                        className="w-40 h-40 object-cover rounded border cursor-pointer"
                        onClick={() => handleImageClick(backImageUrl)}
                      />
                    ) : (
                      <Typography
                        variant={TypographyVariant.SMALL}
                        className="text-gray-400"
                      >
                        No back image available.
                      </Typography>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ImageModal
        open={modalOpen}
        imageUrl={modalImageUrl}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

const ImageModal = ({
  open,
  imageUrl,
  onClose,
}: {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="bg-white p-0 rounded shadow-lg w-[80vw] h-[70vh] max-w-4xl flex flex-col items-center justify-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover rounded"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-2 bg-[#007A61] text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IDVerification;
