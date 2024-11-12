import React, { FC } from "react";
import { Svgprops } from "./types";
import patients from "../Assets/svgImages/patients.svg";
import logo from "../Assets/svgImages/logo.svg";
import check from "../Assets/svgImages/Vector (1).svg";
import weNaija from "../Assets/svgImages/Wenaija.svg";
import linkedin from "../Assets/svgImages/Linkedin.svg";
import instagram from "../Assets/svgImages/insta.svg";
import facebook from "../Assets/svgImages/Facebook.svg";
import twitter from "../Assets/svgImages/twitter.svg";
import avatar from "../Assets/svgImages/Avatar.svg";
import report_icon from "../Assets/svgImages/report.svg";
import home from "../Assets/svgImages/home.svg";
import cup from "../Assets/svgImages/cup.svg";
import firstImageSvg from "../Assets/svgImages/first-box-image.svg";
import homeReportStarSvg from "../Assets/svgImages/homeReportStar.svg";
import homeAvatarSvg from "../Assets/svgImages/AvatarHomeInstitute.svg";
import arrowUpSvg from "../Assets/svgImages/ArrowUp.svg";
import timeClocKSvg from "../Assets/svgImages/Time Circle.svg";
import whiteArrowSvg from "../Assets/svgImages/whiteArrow.svg";
import bigGirlSvg from "../Assets/svgImages/bgGirl.svg";
import arrowBackSvg from "../Assets/svgImages/Arrow-back.svg";
import timerSurveySvg from "../Assets/svgImages/timerSurvey.svg";
import arrowLeftSvg from "../Assets/svgImages/ArrowLeft.svg";
import locationGreenSvg from "../Assets/svgImages/Location.svg";
import callingGreenSvg from "../Assets/svgImages/Calling.svg";
import messageGreenSvg from "../Assets/svgImages/Message.svg";
import timeGreenSvg from "../Assets/svgImages/TimeGreenCircle.svg";






const Icon: FC<Svgprops> = ({ type, className }) => {
  const renderIcon = () => {
    switch (type) {
      case "patients":
        return <img src={patients} alt="heart icon" className={className} />;
      case "logo":
        return <img src={logo} alt="heart icon" className={className} />;
      case "check":
        return <img src={check} alt="heart icon" className={className} />;
      case "wenaija":
        return <img src={weNaija} alt="we-naija icon" className={className} />;
      case "linkedin":
        return <img src={linkedin} alt="we-naija icon" className={className} />;
      case "instagram":
        return (
          <img src={instagram} alt="we-naija icon" className={className} />
        );
      case "facebook":
        return <img src={facebook} alt="we-naija icon" className={className} />;
      case "twitter":
        return <img src={twitter} alt="we-naija icon" className={className} />;
        case "avatar":
          return <img src={avatar} alt="we-naija icon" className={className} />;
          case "report":
            return <img src={report_icon} alt="we-naija icon" className={className} />;
            case "home":
            return <img src={home} alt="we-naija icon" className={className} />;
            case "cup":
            return <img src={cup} alt="we-naija icon" className={className} />;
            case "home-kyc-verification":
            return <img src={firstImageSvg} alt="we-naija home-kyc-verification svg" className={className} />;
            case "home-report-star":
            return <img src={homeReportStarSvg} alt="we-naija homeReportStar svg" className={className} />;
            case "homeAvatar":
            return <img src={homeAvatarSvg} alt="we-naija homeAvatar svg" className={className} />;
            case "arrowUpSvg":
            return <img src={arrowUpSvg} alt="we-naija arrowUp svg" className={className} />;case "arrowUpSvg":
            case "timeClocKSvg":
            return <img src={timeClocKSvg} alt="we-naija time Clock svg" className={className} />;
            case "whiteArrowSvg":
            return <img src={whiteArrowSvg} alt="we-naija time Clock svg" className={className} />;
            case "bigGirlSvg":
            return <img src={bigGirlSvg} alt="we-naija time Clock svg" className={className} />;
            case "arrowBackSvg":
            return <img src={arrowBackSvg} alt="we-naija time Clock svg" className={className} />;
            case "timerSurveySvg":
            return <img src={timerSurveySvg} alt="we-naija time Clock svg" className={className} />;
            case "arrowLeftSvg":
            return <img src={arrowLeftSvg} alt="we-naija time Clock svg" className={className} />;
            case "locationGreenSvg":
            return <img src={locationGreenSvg} alt="we-naija time Clock svg" className={className} />;
            case "timeGreenSvg":
            return <img src={timeGreenSvg} alt="we-naija time Clock svg" className={className} />;
            case "callingGreenSvg":
            return <img src={callingGreenSvg} alt="we-naija time Clock svg" className={className} />;
            case "messageGreenSvg":
            return <img src={messageGreenSvg} alt="we-naija time Clock svg" className={className} />;
            

      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon;
