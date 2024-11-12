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
import startpoints from "../Assets/svgImages/star_points.svg";
import kyc from "../Assets/svgImages/kyc.svg";
import task from "../Assets/svgImages/tasks.svg";
import warning_icon from "../Assets/svgImages/warning.svg";








const Icon: FC<Svgprops> = ({ type, className, click }) => {
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
            return <img src={cup} alt="cup icon" className={className} />;
            case "starPoints":
              return <img src={startpoints} alt="start point icon" className={className} />;
              case "kyc":
                return <img src={kyc} alt="start point icon" className={className} />;
                case "tasks":
                return <img src={task} alt="start point icon" className={className} />;
                case "warning":
                  return <img src={warning_icon} alt="start point icon" className={className} />;

      default:
        return null;
    }
  };

  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
