import React, { FC } from "react";
import { Svgprops } from "./types";
import patients from "../Assets/svgImages/patients.svg";
import logo from "../Assets/svgImages/logo.svg";
import check from "../Assets/svgImages/Vector (1).svg";
import idcard from "../Assets/svgImages/idcard.svg";
import mobile from "../Assets/svgImages/mobile.svg";
import person from "../Assets/svgImages/person.svg";
import notification from "../Assets/svgImages/notification.svg";
import settings from "../Assets/svgImages/settings.svg";
import user from "../Assets/svgImages/user.svg";
import nigerianflag from "../Assets/svgImages/nigerianflag.svg";
import calendar from "../Assets/svgImages/calender.svg";
import cloudUpload from "../Assets/svgImages/cloudUpload.svg";
import imageUploadIcon from "../Assets/svgImages/imageUploadIcon.svg";
import pdfUploadIcon from "../Assets/svgImages/pdfUploadIcon.svg";
import deleteIcon from "../Assets/svgImages/deleteIcon.svg";
const Icon: FC<Svgprops> = ({ type, className }) => {
  const renderIcon = () => {
    switch (type) {
      case "patients":
        return <img src={patients} alt="heart icon" className={className} />;
      case "logo":
        return <img src={logo} alt="heart icon" className={className} />;
      case "check":
        return <img src={check} alt="heart icon" className={className} />;
      case "idcard":
        return <img src={idcard} alt="idcard" className={className} />;
      case "mobile":
        return <img src={mobile} alt="mobile" className={className} />;
      case "person":
        return <img src={person} alt="person" className={className} />;
      case "notification":
        return (
          <img src={notification} alt="notification" className={className} />
        );
      case "settings":
        return <img src={settings} alt="settings" className={className} />;
      case "user":
        return <img src={user} alt="user" className={className} />;
      case "nigerianflag":
        return (
          <img src={nigerianflag} alt="nigerian flag" className={className} />
        );
      case "calendar":
        return <img src={calendar} alt="calendar" className={className} />;
      case "cloudUpload":
        return (
          <img src={cloudUpload} alt="cloudUpload" className={className} />
        );
      case "imageUploadIcon":
        return (
          <img
            src={imageUploadIcon}
            alt="fileUploadIcon"
            className={className}
          />
        );
      case "pdfUploadIcon":
        return (
          <img src={pdfUploadIcon} alt="pdfUploadIcon" className={className} />
        );
      case "deleteIcon":
        return <img src={deleteIcon} alt="deleteIcon" className={className} />;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon;
