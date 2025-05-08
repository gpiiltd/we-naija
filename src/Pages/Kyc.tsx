import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import KycCard from "../Components/KYCpages/KycCard";
import SkipButton from "../Components/KYCpages/SkipButton";
import KycHeader from "../Components/KYCpages/KycHeader";
import { useEffect } from "react";
import { triggerGetUserProfile } from "../redux/Services/settings/settingsServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store/store";
import { ClipLoader } from "react-spinners";

const Kyc = () => {
  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data, loading } = userProfileData;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);

  const kycStep = data?.kyc_step;

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <ClipLoader color="#007A61" size={24} className="mr-6" />
        Loading...
      </div>
    );
  }

  return (
    <div className="">
      <KycHeader />

      <div className="flex flex-col p-4 md:p-8 items-center justify-center min-h-screen mt-14 lg:mt-2">
        <div className="text-center">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="font-bold text-[#17191C]"
          >
            You’re almost there!
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-gray-500 mt-4"
          >
            Complete your KYC verification.
          </Typography>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <KycCard
            title="Validate Phone Number"
            description="Validate your phone number by entering 
            the OTP sent to your registered number."
            icon="mobile"
            linkTo="/kyc/validate-phone"
            kycStep={kycStep}
          />
          <KycCard
            title="Personal Information"
            description="Provide details such as your name, age D.O.B etc..."
            icon="person"
            linkTo="/kyc/personal-information"
          />
          <KycCard
            title="ID Verification"
            description="Use government issued documents to verify your ID                                          "
            icon="idcard"
            linkTo="/kyc/id-verification"
          />
        </div>

        <SkipButton />
      </div>
    </div>
  );
};

export default Kyc;
