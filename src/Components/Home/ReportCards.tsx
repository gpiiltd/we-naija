import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";

interface ReportCardsProps {
  icon: string;
  title: string;
  number: number;
}

const ReportCards: React.FC<ReportCardsProps> = ({ icon, title, number }) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row w-full">
      <div className="flex-1 border-[1px] border-solid border-[#D0D5DD] rounded-lg p-6 flex flex-col justify-between min-w-[250px]">
        <div className="flex justify-between items-center mb-2">
          <Icon type={icon} className="w-10 h-10 text-[#ED7D31]" />
          <a
            href="#"
            className="text-[#007A61] font-semibold text-sm flex items-center"
          >
            View <span className="ml-1">↗</span>
          </a>
        </div>
        <div>
          <p className="text-[#5E5959] text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{number}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCards;
