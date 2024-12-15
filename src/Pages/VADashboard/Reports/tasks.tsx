import { useNavigate } from "react-router-dom";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";
import { handleBreadCrumbNavigate } from "../../../utils/handleBreadCrumb";

const Tasks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <Typography
        variant={TypographyVariant.SMALL}
        className="pt-1 text-light_gray max-w-lg"
      >
        Kindly select the community task category you would like to proceed
        with.
      </Typography>
      <div className="grid gap-6 py-3 pb-48 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card titleLeft={undefined} titleRight={undefined}>
          <div
            className="bg-[#F5F4FE] flex gap-2 items-center py-12 px-6 gap-2 cursor-pointer"
            onClick={() =>
              handleBreadCrumbNavigate(
                "/verified-agent-dashboard/reports/NCD-prevention",
                "NCD prevention",
                navigate
              )
            }
          >
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                NCD Prevention
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>

        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="bg-[#FEF8F4] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer">
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                Sexual Health
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>

        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="bg-[#F4FEF5] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer">
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                Climate, Environment and Health
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>

        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="bg-[#F4F9FE] flex justify-between items-center py-12 px-6 gap-2 cursor-pointer.">
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                Health Service Delivery
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>

        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="bg-[#F5F4FE] flex justify-between items-center py-12 px-6">
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                Immunization and Vaccines
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>

        <Card titleLeft={undefined} titleRight={undefined}>
          <div className="bg-[#FDF4FE] flex justify-between items-center py-12 px-6">
            <div>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide"
              >
                MNCH
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
              size={34}
              color="#007A61"
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Tasks;
