import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from "../../../../../Components/Typography";
import { TypographyVariant } from "../../../../../Components/types";
import { useNavigate } from "react-router-dom";
import Icon from "../../../../../Assets/SvgImagesAndIcons";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import ProgressBar from "../../../../../Components/Home/ProgressBar";
import { Button, Card } from "@gpiiltd/gpi-ui-library";
import { LuClock12 } from "react-icons/lu";

import { IoIosArrowForward } from "react-icons/io";
import ButtonComponent from "../../../../../Components/ButtonComponent";

const SurveyList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#FFFFFF] py-3 ">
        <section>
          <div className="flex gap-3 items-center">
            <div onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft size={24} className="cursor-pointer" />
            </div>
            <Icon type="homeAvatar" className="pr-2" />

            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="font-bold"
            >
              Quotient Specialist Hospital (QSH){" "}
            </Typography>
          </div>
        </section>
        {/* lists */}
        <section className="flex gap-10 p-4 ">
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
              <CiLocationOn color="#007A61" />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray"
              >
                No 5, Lekki view, Lagos Island, Lagos state. Nigeria{" "}
              </Typography>
            </div>

            <div className="flex gap-2">
              <CiClock2 color="#007A61" />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray"
              >
                Monday - Sunday (24 hours){" "}
              </Typography>
            </div>
          </div>
          <Icon type="line" />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <FiPhoneCall color="#007A61" />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray"
              >
                08105201636{" "}
              </Typography>
            </div>
            <div className="flex gap-2">
              <HiOutlineEnvelope color="#007A61" />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray"
              >
                Quotientspecialist@gmail.com{" "}
              </Typography>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-[#FAFAFA] px-2 pb-20">
        <div className=" border-b py-5">
          <section className="pt-4">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold"
            >
              Survey list (4){" "}
            </Typography>{" "}
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-light_gray"
            >
              Kindly select the survey indicator you would like to report on
              this institution.
            </Typography>
          </section>
        </div>
        <div className="place-self-center py-3 cursor-pointer">
          <Icon type="watch" />
        </div>
        {/* cards */}
        <div className="grid gap-6 py-6  grid-cols-1 md:grid-cols-2">
          <Card titleLeft={undefined} titleRight={undefined}>
            <div className="py-8 px-6">
              <div className="flex gap-2 items-center  justify-between cursor-pointer">
                <div>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="font-bold tracking-wide"
                  >
                    Competency of health workers{" "}
                  </Typography>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="pt-2 text-light_gray"
                  >
                    Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                    egestas amet tortor ut.
                  </Typography>
                </div>

                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
              <div className="flex gap-2 items-center pt-3">
                <LuClock12 color="#7A0019" />

                <Typography
                  variant={TypographyVariant.SMALL}
                  className=" text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
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
                    Acceptability of services{" "}
                  </Typography>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="pt-2 text-light_gray"
                  >
                    Lorem ipsum dolor sit amet consectetur. Platea ullamcorper
                    egestas amet tortor ut.
                  </Typography>
                </div>

                <IoIosArrowForward
                  className="font-extrabold"
                  size={24}
                  color="#007A61"
                />
              </div>
              <div className="flex gap-2 items-center pt-3">
                <LuClock12 color="#7A0019" />

                <Typography
                  variant={TypographyVariant.SMALL}
                  className=" text-light_gray"
                >
                  5 tasks{" "}
                </Typography>
              </div>

              <ProgressBar percentage={10} />
            </div>
          </Card>
        </div>
        <div className="border h-50 bg-white py-10 flex justify-between px-10 rounded-lg">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="pt-1 font-bold"
          >
            Have generic feedback or reports on this facility?
          </Typography>

          <div className="flex gap-2">
            {" "}
            <ButtonComponent
              text="Upload images"
              border_color="#5E5959"
              text_color="#17191C"
              active={true}
            />
            <ButtonComponent
              text="Write a report"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={true}
              onClick={()=>navigate('/verified-agent-dashboard/reports/hospitals/give-report')}

            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyList;
