import React, { FC } from "react";
import { Svgprops } from "./types";
import patients from "../assets/svgImages/patients.svg";
import logo from '../assets/svgImages/logo.svg'


const Icon: FC<Svgprops> = ({ type, className }) => {
  const renderIcon = () => {
    switch (type) {
      case "patients":
        return <img src={patients} alt="heart icon" className={className} />;
        case "logo":
          return <img src={logo} alt="heart icon" className={className} />;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon;
