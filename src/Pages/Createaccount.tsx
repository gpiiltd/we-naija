import React from "react";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";

const SignUp = () => {
  return (
    <AuthPages>
      <div className="w-full">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-black "
        >
          Create Account
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-light_gray "
        >
          Kindly fill in your details to sign up
        </Typography>

      </div>
    </AuthPages>
  );
};

export default SignUp;
