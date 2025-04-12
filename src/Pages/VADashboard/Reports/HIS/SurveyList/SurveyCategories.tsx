import ProgressBar from "../../../../../Components/Home/ProgressBar";
import { Card } from "@gpiiltd/gpi-ui-library";
import { LuClock12 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { TypographyVariant } from "../../../../../Components/types";
import { useNavigate } from "react-router-dom";
import Typography from "../../../../../Components/Typography";

export const GenericComponent = ({ surveyIndicatorData }: { surveyIndicatorData: any[] }) => {
  const navigate = useNavigate();

  return (
    <>
        <div className="grid gap-6 py-6  grid-cols-1 md:grid-cols-2">
          
        {surveyIndicatorData.length > 0 ? (
          surveyIndicatorData.map((indicator, index) => (
            <Card key={index} titleLeft={undefined} titleRight={undefined}>
              <div
                className="py-8 px-6"
                onClick={() =>
                  navigate(
                    `/verified-agent-dashboard/reports/hospitals/give-report/${indicator.identifier}`
                  )
                }
              >
                <div className="flex gap-2 items-center justify-between cursor-pointer">
                  <div>
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="font-bold tracking-wide"
                    >
                      {indicator.name}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="pt-2 text-light_gray"
                    >
                      {indicator.description}
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
                    className="text-light_gray"
                  >
                    3 tasks
                  </Typography>
                </div>

                <ProgressBar percentage={indicator.progress} />
              </div>
            </Card>
          ))
        ) : (
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center text-light_gray"
          >
            Loading indicators...
          </Typography>
        )}



        {/* <Card titleLeft={undefined} titleRight={undefined}>
          <div
            className="py-8 px-6"
            onClick={() =>
              navigate(
                "/verified-agent-dashboard/reports/hospitals/give-report"
              )
            }
          >
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
                  Lorem ipsum dolor sit amet consectetur. Platea
                  ullamcorper egestas amet tortor ut.
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
                  Lorem ipsum dolor sit amet consectetur. Platea
                  ullamcorper egestas amet tortor ut.
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
        </Card> */}
      </div>
   
      </>
    );
  };
  
  export const PediatricComponent = () => {
    const navigate = useNavigate();
  
    return (
      <>
        <div className="grid gap-6 py-6  grid-cols-1 md:grid-cols-2">
          <Card titleLeft={undefined} titleRight={undefined}>
            <div
              className="py-8 px-6"
              onClick={() =>
                navigate(
                  "/verified-agent-dashboard/reports/hospitals/give-report"
                )
              }
            >
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
      </>
    );
  };
  
  export const SexualReproductiveHealthComponent = () => {
    return (
      <>
        <div className="border h-50 bg-white py-10 flex justify-between  px-10 rounded-lg mb-8">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="pt-1 font-bold "
          >
            No report on Sexual & reproductive health
          </Typography>
      
        </div>
      </>
    );
  };