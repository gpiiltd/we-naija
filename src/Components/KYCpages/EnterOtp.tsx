import React, { useEffect, useState } from "react";
import { Button, Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import KycHeader from "./KycHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triggerPhoneNumberVerificationOtp } from "../../redux/Services/user/UserServices";
import { toast } from "react-toastify";
import { RootState } from "../../redux/Store/store";
import { resetState } from "../../redux/Slices/user/userSlice";

const EnterOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [Errors, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, message, kycPhoneNumber, loading } = useSelector(
    (state: RootState) => state.user,
  );

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      // Allow only numeric input
      const newOtp = [...otp];
      newOtp[index] = value.slice(0, 1); // Only allow one character
      setOtp(newOtp);
      setError(""); // Clear error on valid input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus(); // Focus next input
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index]) {
      // If the current input is empty and backspace is pressed, focus the previous input
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
    // navigate('/kyc/personal-information')
    const payload = {
      mobile_number: kycPhoneNumber,
      otp: otpCode,
    };
    dispatch(triggerPhoneNumberVerificationOtp(payload) as any);
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

  return (
    <>
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
            Didn’t receive a code?{" "}
            <p className=" mt-4" style={{ color: "#ED7D31" }}>
              Re-send code via SMS
            </p>
          </Typography>

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
