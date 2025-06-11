import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import { formatOperationalDays } from "../../utils/inputValidations";

interface InstitutionsCardProps {
  name?: string;
  abbreviation?: string;
  address?: string;
  hours?: string;
  phone?: string;
  email?: string;
  website?: string;
  status?: string;
  statusMessage?: string;
  responseTimeMessage?: string;
  icon?: string;
  opening_time?: string;
  closing_time?: string;
  operation_days?: string;
  onClick?: () => void;
}

const InstitutionsCard: React.FC<InstitutionsCardProps> = ({
  name,
  address,
  // hours,
  icon,
  opening_time,
  closing_time,
  operation_days,
  onClick,
}) => {
  return (
    <div className="div " onClick={onClick}>
      <div className="border-[1px] border-solid border-[#D0D5DD] rounded-lg bg-white shadow-md p-2 mt-4 cursor-pointer">
        <div className="py-4 px-6 mr-4">
          <section className="flex justify-start ">
            {icon ? (
              <img src={icon} alt="Institution Icon" className="pr-2" />
            ) : (
              <div className="w-8 h-8 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full">
                <span className="text-white p-2">
                  {name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              </div>
            )}
            <div className="ml-2">
              <p className="font-bold text-black">{name}</p>
              <p className="font-normal text-[#5E5959]">
                {name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")}
              </p>
            </div>
          </section>
          <p className="font-normal text-sm pt-3">{address || "NA"}</p>
          <div className="flex items-center justify-start pt-1">
            <Icon type="timeClocKSvg" className="pr-2" />
            <p className="font-normal text-sm text-[#5E5959] pr-1">
              {formatOperationalDays(operation_days || "")}
            </p>
            <p className="font-normal text-sm">
              ({opening_time} - {closing_time})
            </p>
          </div>
        </div>

        <div className="h-[1.5px] w-full bg-[#E4E7EC]"></div>
        <div className="flex items-center justify-end pr-4 pt-2 mb-1">
          <p className="font-bold text-sm text-[#007A61] pr-1">Give report</p>
          <Icon type="arrowUpSvg" className="pr-2" />
        </div>
      </div>
    </div>
  );
};

export default InstitutionsCard;
