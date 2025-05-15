import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import FloatingInput from "../../Components/Input/FloatingInput";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/SvgImagesAndIcons";
import { AppDispatch, RootState } from "../../redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerGetUserProfile,
  triggerUpdateContactInfo,
} from "../../redux/Services/settings/settingsServices";
import FloatingSelect from "../../Components/Input/FloatingSelect";
import { stateOptions, lgaOptions } from "../../utils/selectOptions";
import { toast, ToastContainer } from "react-toastify";

// interface IContactInfo {
//   state: string;
//   lga: string;
//   address: string;
// }
const ContactInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  const { userProfileData, updateContactInfo } = useSelector(
    (state: RootState) => state.settings,
  );
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setEmail(data.email || "");
      setPhoneNumber(data.mobile_number ? `+234${data.mobile_number}` : "");
      setAddress(data.address || "");
      setState(data.state_id || "");
      setLga(data.lga_id || "");
    }
  }, [data]);

  const isFormComplete = address !== "" && state !== "" && lga !== "";

  const handleUpdateContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedState = stateOptions.find(
      (option) => option.name.toString() === state,
    );
    const selectedLga = lgaOptions.find(
      (option) => option.name.toString() === lga,
    );
    const payload = {
      address,
      state_id: selectedState?.value,
      lga_id: selectedLga?.value,
    };
    console.log("payloadXXXX", payload);
    dispatch(triggerUpdateContactInfo(payload));
  };

  useEffect(() => {
    if (updateContactInfo.statusCode !== 200 && updateContactInfo.error) {
      toast.error(updateContactInfo.message);
    }
    if (updateContactInfo.statusCode === 200 && updateContactInfo.data) {
      toast.success(updateContactInfo.message);
    }
  }, [updateContactInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant={TypographyVariant.NORMAL}>Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center md:mt-4">
      <ToastContainer />
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
          <form
            onSubmit={handleUpdateContactInfo}
            className="flex flex-col gap-1"
          >
            <FloatingInput
              label="Email"
              value={email}
              onChange={setEmail}
              error={email === "" && error ? "Email is required." : ""}
              readOnly={true}
            />
            <FloatingInput
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={
                phoneNumber === "" && error ? "Phone number is required." : ""
              }
              readOnly={true}
            />

            <FloatingInput
              label="Residential Address"
              value={address}
              onChange={setAddress}
              error={address === "" && error ? "Address is required." : ""}
            />

            <FloatingSelect
              label="State"
              options={stateOptions.map((option) => ({
                value: option.value.toString(),
                label: option.name,
              }))}
              value={state}
              onChange={setState}
              error={state === "" && error ? "State is required." : ""}
            />

            <FloatingSelect
              label="LGA"
              options={lgaOptions.map((option) => ({
                value: option.value.toString(),
                label: option.name,
              }))}
              value={lga}
              onChange={setLga}
              error={lga === "" && error ? "LGA is required." : ""}
            />

            <button
              type="submit"
              className={`my-4 mb-8 w-full py-4 rounded-md ${
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
