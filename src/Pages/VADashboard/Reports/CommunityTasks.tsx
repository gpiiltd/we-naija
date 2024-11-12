import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";

const CommunityTasks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-3 items-center">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>
        <Typography variant={TypographyVariant.SUBTITLE}>
          Community Tasks
        </Typography>
      </div>
      <Typography
  variant={TypographyVariant.SMALL}
  className="pt-1 text-light_gray max-w-lg" // Adjust this max-width to control line breaks
>
  Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel euismod
  convallis adipiscing enim. Choose any available indicator and begin task.
</Typography>
      <div className="grid gap-6 py-6 pb-48 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#F5F4FE] flex gap-2 items-center py-12 px-6 gap-2 cursor-pointer" onClick={()=>navigate('/verified-agent-dashboard/reports/community-tasks/NCD-prevention')}>
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              NCD Prevention
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>

      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#FEF8F4] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer">
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              Sexual Health
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>

      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#F4FEF5] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer">
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              Climate, Environment and Health
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>

      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#F4F9FE] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer.">
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              Health Service Delivery
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>

      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#F5F4FE] flex justify-between items-center py-12 px-6">
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              Immunization and Vaccines
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>

      <Card titleLeft={undefined} titleRight={undefined}>
        <div className="bg-[#FDF4FE] flex justify-between items-center py-12 px-6">
          <div>
            <Typography variant={TypographyVariant.NORMAL} className="font-bold tracking-wide">
              MNCH
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="pt-2 text-light_gray">
              Lorem ipsum dolor sit amet consectetur. Platea ullamcorper egestas amet tortor ut.
            </Typography>
          </div>
          <IoIosArrowForward className="font-extrabold" size={34} color="#007A61" />
        </div>
      </Card>
    </div>


    </div>
  );
};

export default CommunityTasks;
