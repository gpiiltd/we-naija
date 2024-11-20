import React, { useState } from "react";
import Icon from "../Assets/SvgImagesAndIcons";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import { Button } from "@gpiiltd/gpi-ui-library";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";

const borderStyle = {
  border: "1px solid #ccc",
  borderRadius: "15px",
  padding: "5px",
  width: "50px",
  height: "50px",
  textAlign: "center",
  fontSize: "1.2rem",
  outline: "none",
  margin: "3px",
};

const OTP = () => {
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      navigate("/reset-password");
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <div className="hidden lg:flex pt-12 w-full  flex-col gap-8 md:pb-8 md:bg-teal_green md:h-screen md:gap-12 lg:pt-18 lg:gap-24 lg:w-2/4 lg:pb-0">
        <div className="md:m-4 flex items-center justify-center">
          <Icon type="logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <Icon type="patients" />
            <div className="hidden md:block pt-6 w-[300px]">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-light_gray text-center"
              >
                Let's build a healthy community together
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 pt-12 md:pt-24 lg:pt-48 md:px-32 lg:px-56">
        <div className="w-full pt-8 lg:pt-0">
          <div className="flex flex-col items-center gap-6 lg:gap-4">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-black text-center "
            >
              Check your email
            </Typography>
            <div className="">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-light_gray  text-center  "
              >
                Enter OTP send to your email
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-primary_green font-extrabold "
              >
                “asuquogodwin0@gmail.com”{" "}
              </Typography>
            </div>
            <div className="flex flex-col justify-center items-center pt-4 w-full">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                OTPLength={6}
                otpType="number"
                disabled={false}
                secure={false}
                inputClassName="otp-input"
                inputStyles={borderStyle}
                autoFocus={true}
              />
            </div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray  text-center  "
            >
              Didn’t receive a code?{" "}
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-black  text-center  "
            >
              Re-send code via SMS (0:30){" "}
            </Typography>
            <div className="w-full pt-8 lg:pt-6">
              {" "}
              <Button
                text="Submit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={loading}
                onClick={sendOtp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
