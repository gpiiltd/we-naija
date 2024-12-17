import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import Typography from "../Typography";
import { TypographyVariant } from "../types";



interface ToastProps {
  isVisible: boolean; // Controls whether the toast is displayed
}

const Toast: React.FC<ToastProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null; // Do not render anything if not visible
  }

  return (
    <div className="absolute bg-white border-[1px] p-5 w-[374px] right-4 lg:right-10 rounded-md flex flex-row shadow-lg">
      <div className="flex flex-row pr-5">
        <Icon type="toastCheck" className="pr-2" />
        <div>
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-black text-md text-[16px] font-semibold"
          >
            KYC Successfully verified
          </Typography>

          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-[#667085] text-sm font-normal"
          >
            You have received <span className="text-orange">5 star points</span>.
            Keep the good work going
          </Typography>
        </div>
      </div>
      <Icon type="cancel" className="pr-2" />
    </div>
  );
};

export default Toast;
