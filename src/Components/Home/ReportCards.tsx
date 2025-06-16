import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

interface ReportCardsProps {
  icon: string;
  title: string;
  number: number;
  link?: string;
}

const ReportCards: React.FC<ReportCardsProps> = ({
  icon,
  title,
  number,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 md:flex-row w-full">
      <div className="flex-1 border-[1px] border-solid border-[#D0D5DD] rounded-lg px-6 py-4 flex flex-col justify-between min-w-[250px]">
        <div className="flex justify-between items-center ">
          <Icon type={icon} className="w-10 h-10 text-[#ED7D31]" />
          {link && (
            <>
              <button
                onClick={() => navigate(link)}
                className="text-[#007A61] font-semibold text-sm flex items-center"
              >
                View <span className="ml-1">↗</span>
              </button>
            </>
          )}
        </div>
        <div>
          <p className="text-[#5E5959] text-sm mt-6 mb-2">{title}</p>
          <p className="text-3xl font-bold">{number}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCards;
