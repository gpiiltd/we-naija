import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "../Components/Typography/Typography";
import { TypographyVariant } from "../Components/types";
import Icon from "../Assets/SvgImagesAndIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  triggerEmailVerification,
  triggerEmailVerificationResend,
} from "../redux/Services/user/UserServices";
import type { AppDispatch } from "../redux/Store/store";
import { RootState } from "../redux/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@gpiiltd/gpi-ui-library";
import CustomModal from "../Components/Modal";
import { resetState } from "../redux/Slices/user/userSlice";
const EmailSent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { uid, email_token } = useParams();
  const navigate = useNavigate();
  const { error, message, email, loading } = useSelector(
    (state: RootState) => state.user,
  );

  const emailverification = localStorage.getItem("emailverification");

  let emailToSend = email ? email : (emailverification as string);

  const handleResendOTP = () => {
    const payload = {
      email: emailToSend,
      //   email: "newuser@yopmail.com",
    };
    if (canResend) {
      dispatch(triggerEmailVerificationResend(payload));

      if (error) {
        toast.error(error);
      } else if (!error && message) {
        toast.success(message);
      }
      dispatch(resetState());
      setCountdown(30);
      setCanResend(false);
    }
  };

  const navigateToLogin = () => {
    setShowModal(false);
    navigate("/login");
    // navigate("/verified-agent-dashboard");
  };

  useEffect(() => {
    const payload = {
      uid: uid as string,
      email_token: email_token as string,
    };

    dispatch(triggerEmailVerification(payload));

    setTimeout(() => {
      if (error) {
        toast.error(error);
      } else if (!error && message) {
        toast.success(message);
        setShowModal(true);
      }
    }, 2000);

    setShowModal(true);
    dispatch(resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, uid, email_token]);

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
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-black md:text-center"
            >
              Email verification
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray md:text-center "
            >
              A verification link has been sent to{" "}
              <span className="font-bold text-[#007A61]">{emailToSend}</span>
            </Typography>
          </div>

          <div className="flex  justify-center  my-16">
            <Icon type="sentEmail" />
          </div>

          <div className="flex flex-col  items-center justify-center">
            <div className="flex mb-6 text-center justify-center w-96">
              <Typography variant={TypographyVariant.SMALL}>
                Check your inbox and click the link to complete the email
                verification process.
              </Typography>
            </div>
            <div
              onClick={handleResendOTP}
              className={`cursor-${canResend ? "pointer" : "default"}`}
            >
              <Typography
                variant={TypographyVariant.SMALL}
                className={`text-center ${
                  canResend ? "text-orange underline" : "text-black"
                }`}
              >
                {canResend
                  ? "Re-send link via email "
                  : `Re-send link via email  (0:${
                      countdown < 10 ? `0${countdown}` : countdown
                    })`}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(!showModal)}>
        <section className="flex flex-col gap-3 py-6 px-3">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Icon type="success" />
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-black text-center font-bold"
            >
              Registration successful
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-[#5E5959] text-center"
            >
              Account successfully created.
            </Typography>
          </div>
          <Button
            text="Login"
            bg_color="#007A61"
            text_color="#FFFFFF"
            onClick={navigateToLogin}
            active={true}
          />
        </section>
      </CustomModal>
    </div>
  );
};

export default EmailSent;
