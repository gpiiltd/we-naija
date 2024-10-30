import React, { useState } from "react";
import { Button, Header, Typography } from "@gpiiltd/gpi-ui-library";
import logo from "../Assets/svgImages/logo.svg";
import { TypographyVariant } from "../types";
import SkipButton from "./SkipButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../Input/InputField";
import Icon from "../../Assets/SvgImagesAndIcons";
import HeaderComponent from "../Header/Header";

const EnterOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const phoneNumber = "08104201433"; // Example phone number

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
    event: React.KeyboardEvent<HTMLInputElement>
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
    console.log("Entered OTP:", otpCode);
  };

  const isSubmitDisabled = otp.some((digit) => digit === "") || error !== "";

  return (
    <>
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-8 rounded-lg ">
          <Typography variant={TypographyVariant.TITLE} className="">
            Enter OTP
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className=" mb-6 text-gray-500"
          >
            Enter the 6-digit code sent to{" "}
            <span className="font-bold text-green-700">{phoneNumber}</span>
          </Typography>

          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)} // Handle key down events
                className="border border-gray-300 rounded-md w-14 h-14 text-center text-lg mr-4"
                maxLength={1}
              />
            ))}
          </div>
          {error && (
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-red-500 text-center"
            >
              {error}
            </Typography>
          )}

          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center mt-12 flex flex-col items-center justify-center"
          >
            Didn’t receive a code?{" "}
            <a href="#" className=" mt-4" style={{ color: "#ED7D31" }}>
              Re-send code via SMS
            </a>
          </Typography>

          <button
            onClick={handleSubmit}
            className={`w-full text-white bg-teal-600 py-4 rounded-xl mt-4 ${
              isSubmitDisabled ? "opacity-30" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            Proceed
          </button>

          <div className="flex pt-4 items-center justify-center">
            <SkipButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterOtp;
