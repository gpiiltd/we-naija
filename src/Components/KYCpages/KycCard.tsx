import { Link } from "react-router-dom";
import Typography from "../../Components/Typography";

import { TypographyVariant } from "../../Components/types";
import Icon from "../../Assets/SvgImagesAndIcons";
import { KycCardProps } from "../../Components/types";

const KycCard = ({
  title,
  description,
  icon,
  linkTo,
  kycStep,
}: KycCardProps) => {
  const getKycStepValue = (title: string) => {
    switch (title) {
      case "Validate Phone Number":
        return "phone_number";
      case "Personal Information":
        return "personal_info";
      case "ID Verification":
        return "id_verification";
      default:
        return "";
    }
  };

  const isChecked = kycStep === getKycStepValue(title);

  return (
    <div className="mb-4 border p-8 rounded-2xl shadow-md hover:bg-gray-100">
      <Link to={linkTo || ""} className="flex items-start justify-between">
        <div className="flex items-start">
          <Icon type={icon} className="w-10 h-10 mr-4" />
          <div className="pl-4">
            <h1 className=" md:mb-2 text-lg font-semibold  md:text-xl">
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
          className="w-8 h-8 border-6 checked:bg-green-500 text-green-500 border-green-400 rounded-full"
          checked={isChecked}
          readOnly
        />
      </Link>
    </div>
  );
};

export default KycCard;
