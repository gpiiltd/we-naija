import React, { useState, useEffect } from "react";
import { Button, Typography } from "@gpiiltd/gpi-ui-library";
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
import {
  triggerGetUserProfile,
  triggerKycInfoUpdate,
} from "../../redux/Services/settings/settingsServices";
import { toast, ToastContainer } from "react-toastify";
import { resetUpdateKycState } from "../../redux/Services/settings/settingsSlice";

type KYCStatus = "pending" | "approved" | "rejected";

interface UserProfileData {
  id_type?: string;
  id_number?: string;
  id_front?: string;
  id_back?: string;
  kyc_status?: KYCStatus;
  address?: string;
  state?: string;
  lga?: string;
  nationality?: string;
  gender?: string;
  date_of_birth?: string;
}

const IDVerification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [newFrontImage, setNewFrontImage] = useState<File | null>(null);
  const [newBackImage, setNewBackImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const { userProfileData, updateKyc } = useSelector(
    (state: RootState) => state.settings,
  );
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

  const idTypes = [
    { name: "National ID", value: "national_id" },
    { name: "International passport", value: "passport" },
    { name: "Drivers licence", value: "driver_license" },
    { name: "Permanent voter card", value: "permanent_voters_card" },
  ];

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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "front") {
          setNewFrontImage(file);
          setFrontImageUrl(reader.result as string);
        } else {
          setNewBackImage(file);
          setBackImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateKyc = async () => {
    const selectedIdType = idTypes.find((option) => option.name === idType);

    const payload = new FormData();
    payload.append("id_type", selectedIdType?.value || "");
    payload.append("id_number", idNumber);
    payload.append("id_front", newFrontImage as File);
    payload.append("id_back", newBackImage as File);

    await dispatch(triggerKycInfoUpdate(payload));
  };

  useEffect(() => {
    if (updateKyc?.statusCode === 200) {
      toast.success(updateKyc.message);
    }

    if (updateKyc?.error && updateKyc?.message) {
      toast.error(updateKyc.message);
    }
    dispatch(resetUpdateKycState());
    setIsEditing(false);
    setNewFrontImage(null);
    setNewBackImage(null);
  }, [updateKyc]);

  const kycStatus = (data as UserProfileData)?.kyc_status;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center md:mt-4 mb-8">
        <div className="bg-white rounded-lg w-full md:w-[50%]">
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
          {kycStatus === "rejected" ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex gap-4">
                <Icon type="warning" className="text-red-500 mt-1 mr-2" />
                <div>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-red-700 font-semibold mb-2"
                  >
                    KYC Verification Rejected
                  </Typography>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-red-600 mb-4"
                  >
                    {data?.rejection_reason ||
                      "Your KYC verification has been rejected because the images are not clear. Please upload new, clear images of your ID card."}
                  </Typography>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#007A61] text-white px-4 py-2 rounded hover:bg-[#006B54] transition-colors mt-4 cursor-pointer"
                  >
                    Reupload Documents
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <VerificationCard
              statusMessage="Completed"
              progressPercentage={100}
              responseTimeMessage=""
            />
          )}

          <Typography
            variant={TypographyVariant.NORMAL}
            className="mt-8 font-semibold text-lg"
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
                    readOnly={!isEditing}
                  />

                  <FloatingInput
                    label="ID Number"
                    value={idNumber}
                    onChange={setIdNumber}
                    readOnly={!isEditing}
                  />

                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="mt-4 font-semibold text-lg"
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
                    <div className="relative inline-block">
                      {frontImageUrl ? (
                        <>
                          <img
                            src={frontImageUrl}
                            alt="Front of ID Card"
                            className="w-40 h-40 object-cover rounded border cursor-pointer"
                            onClick={() => handleImageClick(frontImageUrl)}
                          />
                          {isEditing && (
                            <label className="absolute bottom-2 right-2 rounded-full p-1 cursor-pointer shadow-md">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, "front")}
                              />
                              <Icon type="edit" className="w-5 h-5" />
                            </label>
                          )}
                        </>
                      ) : (
                        <Typography
                          variant={TypographyVariant.SMALL}
                          className="text-gray-400"
                        >
                          No front image available.
                        </Typography>
                      )}
                    </div>

                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="mb-2 mt-4"
                    >
                      Back of the ID card
                    </Typography>
                    <div className="relative inline-block">
                      {backImageUrl ? (
                        <>
                          <img
                            src={backImageUrl}
                            alt="Back of ID Card"
                            className="w-40 h-40 object-cover rounded border cursor-pointer"
                            onClick={() => handleImageClick(backImageUrl)}
                          />
                          {isEditing && (
                            <label className="absolute bottom-2 right-2 rounded-full p-1 cursor-pointer shadow-md">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, "back")}
                              />
                              <Icon type="edit" className="w-5 h-5" />
                            </label>
                          )}
                        </>
                      ) : (
                        <Typography
                          variant={TypographyVariant.SMALL}
                          className="text-gray-400"
                        >
                          No back image available.
                        </Typography>
                      )}
                    </div>

                    {isEditing && (
                      <div className="mt-8 w-full flex justify-center items-center ">
                        <Button
                          text="Save Changes"
                          bg_color="#007A61"
                          text_color="white"
                          border_color="border-green-500"
                          active={true}
                          loading={false}
                          onClick={handleUpdateKyc}
                        />
                      </div>
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
