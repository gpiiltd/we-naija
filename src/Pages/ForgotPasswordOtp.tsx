import React, { useState, useEffect } from "react";
import Icon from "../Assets/SvgImagesAndIcons";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import { Button } from "@gpiiltd/gpi-ui-library";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/Store/store";
import { useSelector, useDispatch } from "react-redux";
// import {
//   triggerOTPRequest,
//   triggerForgotPasswordOtp,
// } from "../redux/Services/user/UserServices";
import type { AppDispatch } from "../redux/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { resetState } from "../redux/Slices/user/userSlice";
import { resetPasswordOtp } from "../redux/Services/auth/authSlice";
import { triggerRequestForgotPasswordOtp } from "../redux/Services/auth/authService";

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

const ForgotPasswordOtp = () => {
  const [OTP, setOTP] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { error, message, loading, email } = useSelector(
    (state: RootState) => state.user,
  );
  const { passwordOtp } = useSelector((state: RootState) => state.auth);

  const sendOtp = () => {
    const payload = {
      otp: OTP,
    };
    dispatch(triggerRequestForgotPasswordOtp(payload));
  };

  useEffect(() => {
    if (passwordOtp.statusCode === 400) {
      toast.error(passwordOtp.message);
    } else if (passwordOtp.statusCode === 200) {
      toast.success(passwordOtp.message);
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    }
    dispatch(resetPasswordOtp());
  }, [passwordOtp, dispatch, navigate]);

  const handleResendOTP = () => {
    // const payload = {
    //   email: email,
    // };
    if (canResend) {
      // dispatch(triggerRequestForgotPasswordOtp(payload));
      setCountdown(30);
      setCanResend(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!error && message) {
      toast.success(message);
    }
    dispatch(resetPasswordOtp());
  }, [error, message]);

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown((current) => {
          if (current <= 1) {
            setCanResend(true);
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [countdown]);

  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <ToastContainer />
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
                className="text-light_gray  text-center"
              >
                Enter OTP send to your email
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-primary_green font-extrabold text-center"
              >
                {email}
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
              className="text-light_gray text-center"
            >
              Didn't receive a code?{" "}
            </Typography>
            <div
              onClick={handleResendOTP}
              className={`cursor-${canResend ? "pointer" : "default"}`}
            >
              <Typography
                variant={TypographyVariant.NORMAL}
                className={`text-center ${
                  canResend ? "text-orange underline" : "text-black"
                }`}
              >
                {canResend
                  ? "Re-send code via SMS"
                  : `Re-send code via SMS (0:${
                      countdown < 10 ? `0${countdown}` : countdown
                    })`}
              </Typography>
            </div>
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

export default ForgotPasswordOtp;
