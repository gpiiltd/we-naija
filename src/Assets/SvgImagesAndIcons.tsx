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
import startpoints from "../Assets/svgImages/star_points.svg";
import kyc from "../Assets/svgImages/kyc.svg";
import task from "../Assets/svgImages/tasks.svg";
import warning_icon from "../Assets/svgImages/warning.svg";
import key from "../Assets/svgImages/key.svg";
import success from "../Assets/svgImages/success.svg";
import scoutIcon from "../Assets/svgImages/scoutIcon.svg";
import guardianIcon from "../Assets/svgImages/guardianIcon.svg";
import legendIcon from "../Assets/svgImages/legendIcon.svg";
import championIcon from "../Assets/svgImages/championIcon.svg";
import lockIcon from "../Assets/svgImages/lockIcon.svg";
import lineScout from "../Assets/svgImages/lineScout.svg";
import starIcon from "../Assets/svgImages/starIcon.svg";
import no_data from "../Assets/svgImages/no_data.svg";
import line from "../Assets/svgImages/Line.svg";
import video from "../Assets/svgImages/video.svg";
import plusCircle from "../Assets/svgImages/pluscircle.svg";
import minusCircle from "../Assets/svgImages/minuscircle.svg";
import locationWhiteSvg from "../Assets/svgImages/locationw.svg";
import instagramo from "../Assets/svgImages/instagramo.svg";
import twittero from "../Assets/svgImages/twittero.svg";
import facebooko from "../Assets/svgImages/facebooko.svg";
import phone from "../Assets/svgImages/phone.svg";
import email from "../Assets/svgImages/email.svg";
import location from "../Assets/svgImages/locationw.svg";
import chatUs from "../Assets/svgImages/chatUs.svg";
import basicInfo from "../Assets/svgImages/basicInfo.svg";
import passwordReset from "../Assets/svgImages/passwordReset.svg";
import faq from "../Assets/svgImages/faq.svg";
import kycVerify from "../Assets/svgImages/kycVerify.svg";
import joinCom from "../Assets/svgImages/joinCom.svg";
import contactUs from "../Assets/svgImages/contactUs.svg";
import contactInfo from "../Assets/svgImages/contactInfo.svg";
import arrowRight from "../Assets/svgImages/arrowRight.svg";
import medal1 from "../Assets/svgImages/medal1.svg";
import medal2 from "../Assets/svgImages/medal2.svg";
import medal3 from "../Assets/svgImages/medal3.svg";
import lineGuardian from "../Assets/svgImages/lineGuardian.svg";
import lineChampion from "../Assets/svgImages/lineChampion.svg";
import lineLegend from "../Assets/svgImages/lineLegend.svg";

const Icon: FC<Svgprops> = ({ type, className, click }) => {
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
        return (
          <img src={report_icon} alt="we-naija icon" className={className} />
        );
      case "home":
        return <img src={home} alt="we-naija icon" className={className} />;
      case "cup":
        return <img src={cup} alt="cup icon" className={className} />;
      case "starPoints":
        return (
          <img src={startpoints} alt="start point icon" className={className} />
        );
      case "kyc":
        return <img src={kyc} alt="start point icon" className={className} />;
      case "tasks":
        return <img src={task} alt="start point icon" className={className} />;
      case "warning":
        return (
          <img
            src={warning_icon}
            alt="start point icon"
            className={className}
          />
        );
      case "keys":
        return <img src={key} alt="start point icon" className={className} />;
      case "success":
        return (
          <img src={success} alt="start point icon" className={className} />
        );
      case "home-kyc-verification":
        return (
          <img
            src={firstImageSvg}
            alt="we-naija home-kyc-verification svg"
            className={className}
          />
        );
      case "home-report-star":
        return (
          <img
            src={homeReportStarSvg}
            alt="we-naija homeReportStar svg"
            className={className}
          />
        );
      case "homeAvatar":
        return (
          <img
            src={homeAvatarSvg}
            alt="we-naija homeAvatar svg"
            className={className}
          />
        );
      case "arrowUpSvg":
        return (
          <img
            src={arrowUpSvg}
            alt="we-naija arrowUp svg"
            className={className}
          />
        );

      case "timeClocKSvg":
        return (
          <img
            src={timeClocKSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "whiteArrowSvg":
        return (
          <img
            src={whiteArrowSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "bigGirlSvg":
        return (
          <img
            src={bigGirlSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "arrowBackSvg":
        return (
          <img
            src={arrowBackSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "timerSurveySvg":
        return (
          <img
            src={timerSurveySvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "arrowLeftSvg":
        return (
          <img
            src={arrowLeftSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "locationGreenSvg":
        return (
          <img
            src={locationGreenSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "timeGreenSvg":
        return (
          <img
            src={timeGreenSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "callingGreenSvg":
        return (
          <img
            src={callingGreenSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "messageGreenSvg":
        return (
          <img
            src={messageGreenSvg}
            alt="we-naija time Clock svg"
            className={className}
          />
        );
      case "scoutIcon":
        return (
          <img src={scoutIcon} alt="scoutIcon icon" className={className} />
        );
      case "guardianIcon":
        return (
          <img
            src={guardianIcon}
            alt="guardianIcon icon"
            className={className}
          />
        );
      case "legendIcon":
        return (
          <img src={legendIcon} alt="legendIcon icon" className={className} />
        );
      case "championIcon":
        return (
          <img
            src={championIcon}
            alt="championIcon icon"
            className={className}
          />
        );
      case "lockIcon":
        return <img src={lockIcon} alt="lockIcon icon" className={className} />;
      case "lineScout":
        return (
          <img src={lineScout} alt="lineScout icon" className={className} />
        );
      case "starIcon":
        return <img src={starIcon} alt="starIcon icon" className={className} />;
        case "noData":
          return <img src={no_data} alt="starIcon icon" className={className} />;
          case "line":
            return <img src={line} alt="starIcon icon" className={className} />;
            case "watch":
              return <img src={video} alt="starIcon icon" className={className} />;
      case "noData":
        return <img src={no_data} alt="starIcon icon" className={className} />;
      case "plusCircle":
        return (
          <img src={plusCircle} alt="plusCircle icon" className={className} />
        );
      case "minusCircle":
        return (
          <img src={minusCircle} alt="minusCircle icon" className={className} />
        );
      case "locationWhiteSvg":
        return (
          <img
            src={locationWhiteSvg}
            alt="locationWhiteSvg icon"
            className={className}
          />
        );
      case "instagramo":
        return (
          <img src={instagramo} alt="instagramo icon" className={className} />
        );
      case "twittero":
        return <img src={twittero} alt="twittero icon" className={className} />;
      case "facebooko":
        return (
          <img src={facebooko} alt="facebooko icon" className={className} />
        );
      case "phone":
        return <img src={phone} alt="phone icon" className={className} />;
      case "email":
        return <img src={email} alt="email icon" className={className} />;
      case "location":
        return <img src={location} alt="location icon" className={className} />;
      case "chatUs":
        return <img src={chatUs} alt="chatUs icon" className={className} />;
      case "basicInfo":
        return (
          <img src={basicInfo} alt="basicInfo icon" className={className} />
        );
      case "passwordReset":
        return (
          <img
            src={passwordReset}
            alt="passwordReset icon"
            className={className}
          />
        );
      case "faq":
        return <img src={faq} alt="faq icon" className={className} />;
      case "kycVerify":
        return (
          <img src={kycVerify} alt="kycVerify icon" className={className} />
        );
      case "joinCom":
        return <img src={joinCom} alt="joinCom icon" className={className} />;
      case "contactUs":
        return (
          <img src={contactUs} alt="contactUs icon" className={className} />
        );
      case "contactInfo":
        return (
          <img src={contactInfo} alt="contactInfo icon" className={className} />
        );
      case "arrowRight":
        return (
          <img src={arrowRight} alt="arrowRight icon" className={className} />
        );
      case "medal1":
        return (
          <img src={medal1} alt="medal1 icon" className={className} />
        );
      case "medal2":
        return (
          <img src={medal2} alt="medal2 icon" className={className} />
        );
      case "medal3":
        return (
          <img src={medal3} alt="medal3 icon" className={className} />
        );
      case "lineGuardian":
        return (
          <img
            src={lineGuardian}
            alt="lineGuardian icon"
            className={className}
          />
        );
      case "lineChampion":
        return (
          <img
            src={lineChampion}
            alt="lineChampion icon"
            className={className}
          />
        );
      case "lineLegend":
        return (
          <img src={lineLegend} alt="lineLegend icon" className={className} />
        );

      default:
        return null;
    }
  };

  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
