import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from "../../../../../Components/Typography";
import { TypographyVariant } from "../../../../../Components/types";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../../../Assets/SvgImagesAndIcons";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import {
  GenericComponent,
  PediatricComponent,
  SexualReproductiveHealthComponent,
} from "./SurveyCategories";
import ButtonComponent from "../../../../../Components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerGetAllSurveyCategories,
  triggerGetInstitutionById,
  triggerSurveyIndicatorById
} from "../../../../../redux/Services/institute/instituteServices";
import { RootState } from "../../../../../redux/Store/store";

const SurveyList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [institutionDetails, setInstitutionDetails] = useState<any>({});
  const [categories, setSurveyCategories] = useState<any[]>([]);
  const [surveyIndicatorData, setSurveyIndicatorData] = useState<any[]>([]);
  const { surveyCategories, institutionById, surveyIndicator } = useSelector(
    (state: RootState) => state.institute
  );
  useEffect(() => {
    if (institutionDetails?.name) {
      localStorage.setItem("institutionName", institutionDetails.name);
    }
  }, [institutionDetails?.name]);

  useEffect(() => {
    dispatch(triggerGetAllSurveyCategories({}) as any);
    dispatch(triggerGetInstitutionById(id as string) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (institutionById.statusCode === 200 || institutionById.data) {
      setInstitutionDetails(institutionById.data.data);
      
    }
    if (institutionById.error && institutionById.message) {
      console.log("Error fetching institution by id");
    }
  }, [
    institutionById.statusCode,
    institutionById.data,
    institutionById.error,
    institutionById.message,
  ]);

  useEffect(() => {
    if (surveyCategories.statusCode === 200 && surveyCategories.data) {
      console.log("SURVEY CATEGORIES", surveyCategories.data);
      setSurveyCategories(surveyCategories.data);
    }
  }, [
    surveyCategories.error,
    surveyCategories.statusCode,
    surveyCategories.data,
  ]);

  console.log("surveyCategories@@@@***", categories);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (surveyCategories.statusCode === 200 && surveyCategories.data) {
        const genericCategory = surveyCategories.data.find(
          (category: any) => category.name === "Generic"
        );
        const pediatricCategory = categories?.find(
          (category) => category?.name === "Pediatric"
        );
        const sexualReproductiveHealthCategory = categories?.find(
          (category) => category?.name === "Sexual reproduction and health"
        );

        const genericCategoryId = genericCategory
          ? genericCategory.identifier
          : null;
        const pediatricCategoryId = pediatricCategory
          ? pediatricCategory.identifier
          : null;
        const sexualReproductiveHealthCategoryId =
          sexualReproductiveHealthCategory
            ? sexualReproductiveHealthCategory.identifier
            : null;


        if (genericCategoryId) {
          localStorage.setItem("genericCategoryId", genericCategoryId);
        }
        if (pediatricCategoryId) {
          localStorage.setItem("pediatricCategoryId", pediatricCategoryId);
        }
        if (sexualReproductiveHealthCategoryId) {
          localStorage.setItem(
            "sexualReproductiveHealthCategoryId",
            sexualReproductiveHealthCategoryId
          );
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [surveyCategories.statusCode, surveyCategories.data, categories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const genericCategoryId = localStorage.getItem('genericCategoryId');
      if (genericCategoryId) {
        const payload = {
          categoryId: genericCategoryId as string,
        };
        dispatch(triggerSurveyIndicatorById(payload) as any);
      }

      // const pediatricCategoryId = localStorage.getItem('pediatricCategoryId');
      // if (pediatricCategoryId) {
      //   const payload = {
      //     categoryId: pediatricCategoryId as string,
      //   };
      //   dispatch(triggerSurveyIndicatorById(payload) as any);
      // }

      // const sexualReproductiveHealthCategoryId = localStorage.getItem('sexualReproductiveHealthCategoryId');
      // if (sexualReproductiveHealthCategoryId) {
      //   const payload = {
      //     categoryId: sexualReproductiveHealthCategoryId as string,
      //   };
      //   dispatch(triggerSurveyIndicatorById(payload) as any);
      // }
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
    if (surveyIndicator.statusCode === 200 && surveyIndicator.data) {
      console.log("SURVEY INDICATOR DATA in useEffect", surveyIndicator.data.data.indicators);
      setSurveyIndicatorData(surveyIndicator.data.data.indicators);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [surveyIndicator.statusCode, surveyIndicator.data]);

  const navLinks = [
    {
      href: "/verified-agent-dashboard/reports/hospitals/survey-list/generic",
      label: "Generic",
    },
    {
      href: "/verified-agent-dashboard/reports/hospitals/survey-list/pediatric",
      label: "Pediatric",
    },
    {
      href: "/verified-agent-dashboard/reports/hospitals/survey-list/health",
      label: "Sexual & reproductive  health",
    },
  ];
  const [activeLink, setActiveLink] = useState(navLinks[0].href);

  const componentMap: { [key: string]: React.ReactNode } = {
    "/verified-agent-dashboard/reports/hospitals/survey-list/generic": (
      <GenericComponent surveyIndicatorData={surveyIndicatorData} />
    ),
    "/verified-agent-dashboard/reports/hospitals/survey-list/pediatric": (
      <PediatricComponent />
    ),
    "/verified-agent-dashboard/reports/hospitals/survey-list/health": (
      <SexualReproductiveHealthComponent />
    ),
  };

  return (
    <>
      {institutionById.loading ? (
        <div className="bg-[#FFFFFF] py-3">
          <section>
            <div className="flex gap-3 items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="font-bold"
              >
                Loading institution details...
              </Typography>
            </div>
          </section>
        </div>
      ) : (
        institutionDetails && (
          <div className="bg-[#FFFFFF] py-3">
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
                  {institutionDetails?.name} (
                  {institutionDetails?.name
                    ?.split(" ")
                    .map((word: string) => word[0])
                    .join("")}
                  )
                </Typography>
              </div>
            </section>
            <section className="flex gap-10 p-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <CiLocationOn color="#007A61" />
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-light_gray"
                  >
                    {institutionDetails?.address}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <CiClock2 color="#007A61" />
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-light_gray"
                  >
                    {institutionDetails?.operation_days}
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
                    {institutionDetails?.mobile_number}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <HiOutlineEnvelope color="#007A61" />
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-light_gray"
                  >
                    {institutionDetails?.email}
                  </Typography>
                </div>
              </div>
            </section>
          </div>
        )
      )}

      <div className="bg-[#FAFAFA] px-2 pb-20">
        <div className=" border-b pt-5">
          <section className="pt-4 flex flex-col gap-4">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold"
            >
              Survey list (4)
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-light_gray"
            >
              Kindly select the survey indicator you would like to report on
              this institution.
            </Typography>
            <nav className="flex space-x-4">
              {navLinks.map((navlink) => (
                <button
                  key={navlink.href}
                  className={`${
                    activeLink === navlink.href
                      ? "text-primary_green border-b-2 border-primary_green font-bold py-2"
                      : "text-gray-500 py-2"
                  } hover:text-primary_green`}
                  onClick={() => setActiveLink(navlink.href)}
                >
                  {navlink.label}
                </button>
              ))}
            </nav>
          </section>
        </div>
        <div className="place-self-center py-3 cursor-pointer">
          <Icon type="watch" />
        </div>

        <div className="mt-4">
          {componentMap[activeLink] || <div>Component not found</div>}
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
              onClick={() =>
                navigate(
                  "/verified-agent-dashboard/reports/hospitals/give-report"
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyList;
