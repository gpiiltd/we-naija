import React, { FC } from "react";
import { Svgprops } from "./types";
import patients from "../Assets/svgImages/patients.svg";
import logo from '../Assets/svgImages/logo.svg'
import check from '../Assets/svgImages/Vector (1).svg'


const Icon: FC<Svgprops> = ({ type, className }) => {
  const renderIcon = () => {
    switch (type) {
      case "patients":
        return <img src={patients} alt="heart icon" className={className} />;
        case "logo":
          return <img src={logo} alt="heart icon" className={className} />;
          case "check":
            return <img src={check} alt="heart icon" className={className} />;

      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon;
