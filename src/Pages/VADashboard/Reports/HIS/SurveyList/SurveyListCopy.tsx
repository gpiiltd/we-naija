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
import ButtonComponent from "../../../../../Components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerGetAllSurveyCategories,
  triggerGetInstitutionById,
  triggerSurveyIndicatorById,
} from "../../../../../redux/Services/institute/instituteServices";
import { RootState } from "../../../../../redux/Store/store";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";

const SurveyListCopy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [institutionDetails, setInstitutionDetails] = useState<any>({});
  const [categories, setSurveyCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [indicators, setIndicators] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const { surveyCategories, institutionById, surveyIndicator } = useSelector(
    (state: RootState) => state.institute,
  );

  useEffect(() => {
    if (institutionDetails?.name) {
      localStorage.setItem("institutionName", institutionDetails.name);
      localStorage.setItem(
        "institutionIdentifier",
        institutionDetails.identifier,
      );
    }
  }, [institutionDetails?.name, institutionDetails?.identifier]);

  useEffect(() => {
    setIsCategoriesLoading(true);
    dispatch(triggerGetAllSurveyCategories({}) as any);
    dispatch(triggerGetInstitutionById(id as string) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (institutionById.statusCode === 200 || institutionById.data) {
      setInstitutionDetails(institutionById.data.data);
    }
  }, [institutionById]);

  useEffect(() => {
    if (surveyCategories.statusCode === 200 && surveyCategories.data) {
      setSurveyCategories(surveyCategories.data || []);
      // Set the first category as active by default
      if (surveyCategories.data.length > 0 && !activeCategory) {
        setActiveCategory(surveyCategories.data[0].identifier);
      }
      setIsCategoriesLoading(false);
    }
  }, [surveyCategories, activeCategory]);

  useEffect(() => {
    if (activeCategory) {
      setIsLoading(true);
      dispatch(
        triggerSurveyIndicatorById({ categoryId: activeCategory }) as any,
      );
    }
  }, [activeCategory, dispatch]);

  useEffect(() => {
    if (surveyIndicator.statusCode === 200) {
      const categoryData = surveyIndicator.data;
      if (categoryData?.indicators) {
        setIndicators(categoryData.indicators);
      }
      setIsLoading(false);
    }
  }, [surveyIndicator]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
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
                {/* <Icon type="homeAvatar" className="pr-2" /> */}
                {institutionDetails?.logo ? (
                  <img
                    src={institutionDetails?.logo}
                    alt="Institution Icon"
                    className="pr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full">
                    <span className="text-white p-2">
                      {institutionDetails?.name
                        ?.split(" ")
                        .map((word: string) => word[0])
                        .join("")}
                    </span>
                  </div>
                )}

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
        <div className="border-b pt-5">
          <section className="pt-4 flex flex-col gap-4">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold"
            >
              Survey Categories
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-light_gray"
            >
              Kindly select the survey category you would like to report on this
              institution.
            </Typography>
            <nav className="flex space-x-4">
              {isCategoriesLoading ? (
                <Typography variant={TypographyVariant.NORMAL}>
                  Loading categories...
                </Typography>
              ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                  <button
                    key={category.identifier}
                    className={`${
                      activeCategory === category.identifier
                        ? "text-primary_green border-b-2 border-primary_green font-bold py-2"
                        : "text-gray-500 py-2"
                    } hover:text-primary_green`}
                    onClick={() => handleCategoryClick(category.identifier)}
                  >
                    {category.name}
                  </button>
                ))
              ) : (
                <Typography variant={TypographyVariant.NORMAL}>
                  No categories available
                </Typography>
              )}
            </nav>
          </section>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Typography variant={TypographyVariant.NORMAL}>
                Loading indicators...
              </Typography>
            </div>
          ) : (
            <div className="grid gap-6 py-6  grid-cols-1 md:grid-cols-2">
              {indicators.length > 0 ? (
                indicators.map((indicator) => (
                  <Card
                    key={indicator.identifier}
                    titleLeft={undefined}
                    titleRight={undefined}
                  >
                    <div
                      key={indicator.identifier}
                      className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        localStorage.setItem(
                          "surveyIndicatorName",
                          indicator.name,
                        );
                        localStorage.setItem(
                          "surveyIndicatorIdentifier",
                          indicator.identifier,
                        );
                        localStorage.setItem("total_sp", indicator.total_sp);

                        navigate(
                          `/verified-agent-dashboard/reports/hospitals/give-report/${indicator.identifier}`,
                        );
                      }}
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
                    </div>
                  </Card>
                ))
              ) : (
                <Typography variant={TypographyVariant.NORMAL}>
                  No indicators available
                </Typography>
              )}
            </div>
          )}
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
                  "/verified-agent-dashboard/reports/hospitals/give-report",
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyListCopy;
