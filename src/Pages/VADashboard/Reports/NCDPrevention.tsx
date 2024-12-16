import React from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Icon from "../../../Assets/SvgImagesAndIcons";
import ProgressBar from "../../../Components/Home/ProgressBar";
import { handleBreadCrumbNavigate } from "../../../utils/handleBreadCrumb";
import Breadcrumb from "./BreadCrum";

const NCDPrevention = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-3 items-center">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>
        <Typography variant={TypographyVariant.SUBTITLE}>
          NCD prevention
        </Typography>
      </div>
      <Breadcrumb />

      <Typography
        variant={TypographyVariant.SMALL}
        className="pt-1 text-light_gray max-w-lg"
      >
        Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel euismod
        convallis adipiscing enim. Choose any available indicator and begin
        task.
      </Typography>
      <div className="pt-4">
        <Typography variant={TypographyVariant.NORMAL}>
          Indicators (6){" "}
        </Typography>{" "}
        <Typography
          variant={TypographyVariant.SMALL}
          className="pt-2 text-light_gray"
        >
          Kindly select the community indicator you would like to perform a task
          on.{" "}
        </Typography>
      </div>
      <div className="grid gap-6 py-6 pb-48 grid-cols-1 md:grid-cols-2">
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div
              className="flex gap-2 items-center  justify-between cursor-pointer"
              onClick={() =>
                handleBreadCrumbNavigate(
                  "/verified-agent-dashboard/reports/community-tasks/NCD-prevention/mental-health-promotion",
                  "Mental Health Promotion",
                  navigate
                )
              }
            >
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Mental health promotion
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                  egestas amet tortor ut.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={50} />
          </div>
        </Card>
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div className="flex gap-2 items-center  justify-between cursor-pointer">
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Substance abuse prevention{" "}
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                  egestas amet tortor ut.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={10} />
          </div>
        </Card>
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div className="flex gap-2 items-center  justify-between cursor-pointer">
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Privacy and confidentiality{" "}
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-1 text-light_gray max-w-lg"
                >
                  Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel
                  euismod convallis adipiscing enim. Choose any available
                  indicator and begin task.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={10} />
          </div>
        </Card>
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div className="flex gap-2 items-center  justify-between cursor-pointer">
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Risk factor education
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                  egestas amet tortor ut.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={50} />
          </div>
        </Card>
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div className="flex gap-2 items-center  justify-between cursor-pointer">
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Genetic counselling
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                  egestas amet tortor ut.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={60} />
          </div>
        </Card>
        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="py-8 px-6">
            <div className="flex gap-2 items-center  justify-between cursor-pointer">
              <div>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-bold tracking-wide"
                >
                  Hepatitis, sentization and prevention{" "}
                </Typography>
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                  egestas amet tortor ut.
                </Typography>
              </div>

              <div className="bg-effect_green p-1 rounded-full">
                {" "}
                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="kyc" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  15 star points{" "}
                </Typography>
              </div>
            </div>
            <ProgressBar percentage={60} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NCDPrevention;
