import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import FloatingInput from "../../Components/Input/FloatingInput";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/SvgImagesAndIcons";
import { RootState } from "../../redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setEmail(data.email || "");
      setPhoneNumber(data.mobile_number || "");
      setAddress(data.address || "");
    }
  }, [data]);

  const isFormComplete = address !== "" && email !== "" && phoneNumber !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update contact info functionality
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center md:mt-4">
      <div className="w-full md:w-[50%]">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/setting-mobile")
              }
            >
              <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
            </span>

            <Typography variant={TypographyVariant.SUBTITLE}>
              Contact Information
            </Typography>
          </div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-gray-500 mt-2"
          >
            Edit your contact information{" "}
          </Typography>
        </div>
        <div className="pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <FloatingInput
              label="Email"
              value={email}
              onChange={setEmail}
              error={email === "" && error ? "Email is required." : ""}
            />
            <FloatingInput
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={
                phoneNumber === "" && error ? "Phone number is required." : ""
              }
            />

            <FloatingInput
              label="Residential Address"
              value={address}
              onChange={setAddress}
              error={address === "" && error ? "Address is required." : ""}
            />
            {/* <FloatingSelect
              label="Residential Address"
              options={nigerianAddresses}
              value={address}
              onChange={setAddress}
              error={address === "" && error ? "Address is required." : ""}
            /> */}
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
    </div>
  );
};

export default ContactInfo;
