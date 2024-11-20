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
import scoutIcon from "../Assets/svgImages/scoutIcon.svg";
import guardianIcon from "../Assets/svgImages/guardianIcon.svg";
import legendIcon from "../Assets/svgImages/legendIcon.svg";
import championIcon from "../Assets/svgImages/championIcon.svg";
import lockIcon from "../Assets/svgImages/lockIcon.svg";
import lineScout from "../Assets/svgImages/lineScout.svg";
import starIcon from "../Assets/svgImages/starIcon.svg";

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
        return (
          <img src={report_icon} alt="we-naija icon" className={className} />
        );
      case "home":
        return <img src={home} alt="we-naija icon" className={className} />;
      case "cup":
        return <img src={cup} alt="we-naija icon" className={className} />;
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

      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon;
