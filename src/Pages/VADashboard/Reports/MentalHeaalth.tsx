import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import Icon from "../../../Assets/SvgImagesAndIcons";
import Breadcrumb from "./BreadCrum";


const questions = [
    "What do you understand by mental health?",
    "What are those factors that may affect mental in Nigeria?",
    "Mental health refers to only when someone loses his/her mind and roam on the streets. True or False?",
    "What are the challenges of mental health services provision in Nigeria??",
    "If given a chance to legislate, what bill will you like to introduced to improve mental health of Nigerians and why??",
  ];

const MentalHeaalth = () => {
  const navigate = useNavigate();

  return (
    <div>
   <div className="flex gap-3 items-center">
  <div onClick={() => navigate(-1)}>
    <AiOutlineArrowLeft size={24} className="cursor-pointer" />
  </div>
  <Typography variant={TypographyVariant.SUBTITLE}>
    Mental health promotion
  </Typography>

</div>
<Breadcrumb />

<Typography
  variant={TypographyVariant.SMALL}
  className="pt-1 text-light_gray max-w-lg" // Adjust this max-width to control line breaks
>
  Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel euismod
  convallis adipiscing enim. Choose any available indicator and begin task.
</Typography>

      <div className="flex mt-8  flex-col md:px-12 lg:px-52">
        <div className="rounded-lg self-center shadow-lg px-3 py-4 md:px-16 md:py-12 flex flex-col justify-start mb-16">
          <div className="flex flex-col justify-start ">
            <Typography variant={TypographyVariant.SUBTITLE}>
              Mental health promotion
            </Typography>
            <Typography
  variant={TypographyVariant.SMALL}
  className="pt-1 text-light_gray max-w-lg" 
>
  Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel euismod
  convallis adipiscing enim. Choose any available indicator and begin task.
</Typography>

            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="tasks" className="pt-1" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" className="pt-2" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points
                </Typography>
              </div>
            </div>
          </div>

          {/* New Cards */}
        <div className="flex flex-col gap-4">
      {questions.map((question, index) => (
        <div key={index} className="flex gap-3 w-full items-center">
          <div className="border border-d_red rounded-full h-5 w-5 flex items-center justify-center pb-1">
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-d_red"
            >
              {index + 1}
            </Typography>
          </div>
          <div
            className="w-full flex justify-between items-center py-4 px-6 gap-6 cursor-pointer shadow rounded-lg bg-white"
            onClick={() =>
              navigate(
                "/verified-agent-dashboard/reports/community-tasks/NCD-prevention/report-form"
              )
            }
          >
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                {question}
              </Typography>
            </div>
            <div className="bg-effect_green p-1 rounded-full">
              <IoIosArrowForward
                className="font-extrabold"
                size={24}
                color="#007A61"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHeaalth;
