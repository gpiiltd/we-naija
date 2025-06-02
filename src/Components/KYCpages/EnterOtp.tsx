import React, { useEffect, useState } from "react";
import { Button, Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triggerPhoneNumberVerificationOtp } from "../../redux/Services/user/UserServices";
import { toast, ToastContainer } from "react-toastify";
import { AppDispatch, RootState } from "../../redux/Store/store";
import { resetState } from "../../redux/Slices/user/userSlice";
import { triggerPhoneNumberVerificationResend } from "../../redux/Services/auth/authService";
import { resetPhoneNumberVerificationResend } from "../../redux/Services/auth/authSlice";

const EnterOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [Errors, setError] = useState("");
  const [countdown, setCountdown] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { error, message, kycPhoneNumber, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const { resendPhoneNumberOtp } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(0, 1);
      setOtp(newOtp);
      setError("");
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all OTP digits.");
      return;
    }
    const otpCode = otp.join("");
    const payload = {
      mobile_number: kycPhoneNumber,
      otp: otpCode,
    };
    dispatch(triggerPhoneNumberVerificationOtp(payload));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!error && message) {
      toast.success(message);
      setTimeout(() => {
        navigate("/kyc/personal-information");
      }, 1000);
    }
    dispatch(resetState());
  }, [error, message, navigate, dispatch]);

  const isSubmitDisabled = otp.some((digit) => digit === "") || Errors !== "";

  const handleResendOTP = () => {
    const payload = {
      mobile_number: kycPhoneNumber,
    };
    if (canResend) {
      dispatch(triggerPhoneNumberVerificationResend(payload));
      setCountdown(180);
      setCanResend(false);
    }
  };

  useEffect(() => {
    if (resendPhoneNumberOtp.statusCode === 200) {
      toast.success(resendPhoneNumberOtp.message);
    } else if (resendPhoneNumberOtp.error) {
      toast.error(resendPhoneNumberOtp.message);

      dispatch(resetPhoneNumberVerificationResend());
    }
  }, [resendPhoneNumberOtp, dispatch]);
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

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <ToastContainer />
      <KycHeader />
      <div className="flex flex-col items-center justify-center min-h-screen -mt-14">
        <div className="bg-white w-full p-4 md:p-8 rounded-lg md:w-2/4 ">
          <Typography variant={TypographyVariant.SUBTITLE} className="">
            Enter OTP
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className=" mb-6 text-gray-500"
          >
            Enter the 6-digit code sent to{" "}
            <span className="font-bold text-primary_green">
              {kycPhoneNumber}
            </span>
          </Typography>

          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="border border-gray-300 rounded-xl md:w-14 md:h-14 w-10 h-10 text-center text-lg md:mr-4 mr-2 focus:border-green-700 focus:outline-none"
                maxLength={1}
              />
            ))}
          </div>

          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center mt-12 flex flex-col items-center justify-center"
          >
            Didn't receive a code?{" "}
          </Typography>

          <div
            onClick={handleResendOTP}
            className={`mb-8 mt-4 cursor-${canResend ? "pointer" : "default"}`}
          >
            <Typography
              variant={TypographyVariant.SMALL}
              className={`text-center ${
                canResend ? "text-orange underline" : "text-black"
              }`}
            >
              {canResend
                ? "Re-send code via SMS "
                : `Re-send code via SMS  (${formatCountdown(countdown)})`}
            </Typography>
          </div>

          <Button
            text="Proceed"
            active={!isSubmitDisabled}
            bg_color="#007A61"
            text_color="white"
            loading={loading}
            onClick={handleSubmit}
          />

          <div className="flex pt-4 items-center justify-center">
            <SkipButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterOtp;
