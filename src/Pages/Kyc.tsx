import React from "react";
import Typography from "../Components/Typography";

import { TypographyVariant } from "../Components/types";
import KycCard from "../Components/KYCpages/KycCard";
import HeaderComponent from "../Components/Header/Header";
import SkipButton from "../Components/KYCpages/SkipButton";
const Kyc = () => {
  return (
    <div className="">
      <HeaderComponent />

      <div className="flex flex-col items-center justify-center min-h-screen mt-14">
        <div className="text-center">
          <Typography variant={TypographyVariant.TITLE}>
            You’re almost there!
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-gray-500"
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
