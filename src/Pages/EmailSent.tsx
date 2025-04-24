import React, { useEffect, useState } from "react";
import Typography from "../Components/Typography/Typography";
import { TypographyVariant } from "../Components/types";
import Icon from "../Assets/SvgImagesAndIcons";
import { useSelector, useDispatch } from "react-redux";
import { triggerEmailVerificationResend } from "../redux/Services/user/UserServices";
import type { AppDispatch } from "../redux/Store/store";
import { RootState } from "../redux/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetState } from "../redux/Slices/user/userSlice";
const EmailSent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { error, message, email } = useSelector((state: RootState) => state.user);

  localStorage.setItem("emailverification", email);

  const handleResendOTP = () => {
    const payload = {
      email: email,
    };
    if (canResend) {
      dispatch(triggerEmailVerificationResend(payload));

      setCountdown(30);
      setCanResend(false);
    }
    dispatch(resetState());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!error && message) {
      toast.success(message);
    }
    dispatch(resetState());
  }, [error, message, dispatch]);

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

      <div className="flex w-full px-4 pt-5 justify-center items-center md:px-32 lg:px-56">
        <div className="w-full pt-8 lg:pt-0">
          <div className="flex flex-col justify-center items-center lg:items-center pt-6">
            <Typography variant={TypographyVariant.SUBTITLE} className="text-black md:text-center">
              Email verification
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray md:text-center "
            >
              A verification link has been sent to{" "}
              <span className="font-bold text-[#007A61]">{email}</span>
            </Typography>
          </div>

          <div className="flex  justify-center  my-16">
            <Icon type="sentEmail" />
          </div>

          <div className="flex flex-col  items-center justify-center">
            <div className="flex mb-6 text-center justify-center w-96">
              <Typography variant={TypographyVariant.SMALL}>
                Check your inbox and click the link to complete the email verification process.
              </Typography>
            </div>
            <div
              onClick={handleResendOTP}
              className={`cursor-${canResend ? "pointer" : "default"}`}
            >
              <Typography
                variant={TypographyVariant.SMALL}
                className={`text-center ${canResend ? "text-orange underline" : "text-black"}`}
              >
                {canResend
                  ? "Re-send link via email "
                  : `Re-send link via email  (0:${countdown < 10 ? `0${countdown}` : countdown})`}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
