import React from "react";
import { Link } from "react-router-dom";
import Typography from "../../Components/Typography";

import { TypographyVariant } from "../../Components/types";
import Icon from "../../Assets/SvgImagesAndIcons";
import { KycCardProps } from "../../Components/types";

const KycCard = ({ title, description, icon, linkTo }: KycCardProps) => {
  return (
    <div className="mb-4 border p-8 rounded-2xl shadow-md hover:bg-gray-100">
      <Link to={linkTo} className="flex items-start justify-between">
        <div className="flex items-start">
          <Icon type={icon} className="w-10 h-10 mr-4" />
          <div className="pl-4">
            <h1 className="text-center md:mb-4 text-xl  md:text-3xl">
              {title}
            </h1>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 w-full text-sm md:w-[80%] "
            >
              {description}
            </Typography>
          </div>
        </div>

        <input
          type="radio"
          className="w-8 h-8 border-6 border-gray-400 rounded-full"
        />
      </Link>
    </div>
  );
};

export default KycCard;
