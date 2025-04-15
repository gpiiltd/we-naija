import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Icon from "../../../../../Assets/SvgImagesAndIcons";
import Typography from "../../../../../Components/Typography";
import { TypographyVariant } from "../../../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import Survey from "../SurveyReport";

const GiveReport = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center">
      <section className="w-full">
        <div className="flex gap-3 items-center mb-6">
          <div onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={24} className="cursor-pointer" />
          </div>
          <Icon type="homeAvatar" className="pr-2" />
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="font-bold"
          >
            Quotient Specialist Hospital (QSH)
          </Typography>
        </div>
      </section>
      <section className="py-6 pb-16 w-full flex justify-center">
        <Card titleLeft={undefined} titleRight={undefined} width="48.61%">
          <div className=" px-16 pt-8 pb-10">
            <Survey />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default GiveReport;
