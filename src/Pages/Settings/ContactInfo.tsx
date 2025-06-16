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
  triggerGetLocation,
} from "../../redux/Services/settings/settingsServices";
import FloatingSelect from "../../Components/Input/FloatingSelect";
import { allNigerianStates } from "../../utils/selectOptions";
import { toast, ToastContainer } from "react-toastify";
import { resetUpdateContactInfoState } from "../../redux/Services/settings/settingsSlice";
import { ClipLoader } from "react-spinners";
import { Button } from "@gpiiltd/gpi-ui-library";

const ContactInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [error] = useState("");
  const [lgaDataOptions, setLgaDataOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const navigate = useNavigate();

  const { userProfileData, updateContactInfo, locationData } = useSelector(
    (state: RootState) => state.settings,
  );
  const { data, loading } = userProfileData;

  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      const selectedState = Array.isArray(allNigerianStates)
        ? allNigerianStates
            .flat()
            .find((option) => option.name.toString() === state)
        : undefined;
      if (selectedState) {
        dispatch(triggerGetLocation(selectedState.id));
      }
    } else {
      setLgaDataOptions([]);
    }
  }, [dispatch, state]);

  useEffect(() => {
    if (locationData.data) {
      setLgaDataOptions(locationData.data);
    }
  }, [locationData]);

  useEffect(() => {
    if (data) {
      const selectedStated = Array.isArray(allNigerianStates)
        ? allNigerianStates.flat().find((option) => option.id === data.state)
        : undefined;
      const stateName = selectedStated ? selectedStated.name : "";
      setEmail(data.email || "");
      setPhoneNumber(data.mobile_number ? `${data.mobile_number}` : "");
      setAddress(data.address || "");
      setState(stateName || "");
      setLga(data.lga || "");
    }
  }, [data]);

  const isFormComplete = address !== "" && state !== "" && lga !== "";

  const handleUpdateContactInfo = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedState = allNigerianStates
      .flat()
      .find((option) => option?.name.toString() === state);

    const selectedLga = lgaDataOptions.find(
      (option) => option.name.toString() === lga,
    );
    const payload = {
      address,
      state_id: selectedState?.id,
      lga_id: selectedLga?.id,
    };

    dispatch(triggerUpdateContactInfo(payload));
  };

  useEffect(() => {
    if (updateContactInfo.statusCode !== 200 && updateContactInfo.error) {
      toast.error(updateContactInfo.message);
    }
    if (updateContactInfo.statusCode === 200) {
      toast.success(updateContactInfo.message);
    }
    dispatch(resetUpdateContactInfoState());
  }, [updateContactInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full p-6 bg-white rounded-lg mx-auto mb-12">
        <ClipLoader color="#007A61" size={24} className="mr-6" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center md:my-4">
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
        <div className="pt-10 mb-8">
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
              options={
                Array.isArray(allNigerianStates)
                  ? allNigerianStates.flat().map((option) => ({
                      value: option.id.toString(),
                      label: option.name,
                    }))
                  : []
              }
              value={state}
              onChange={setState}
              error={state === "" && error ? "State is required." : ""}
            />

            <FloatingSelect
              label="LGA"
              options={
                Array.isArray(lgaDataOptions)
                  ? lgaDataOptions.map((option) => ({
                      value: option.id.toString(),
                      label: option.name,
                    }))
                  : []
              }
              value={lga}
              onChange={setLga}
              error={lga === "" && error ? "LGA is required." : ""}
            />

            <Button
              text="Save"
              active={isFormComplete}
              bg_color="#007A61"
              text_color="white"
              loading={loading}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
