import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Typography from "../../../../Components/Typography";
import { TypographyVariant } from "../../../../Components/types";
import SearchBar from "../../../../Components/Searchbar";
import ButtonComponent from "../../../../Components/ButtonComponent";
import { CiLocationOn } from "react-icons/ci";
import Icon from "../../../../Assets/SvgImagesAndIcons";
import CustomModal from "../../../../Components/Modal";
import Breadcrumb from "../BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store/store";
import { triggerGetAllInstitution } from "../../../../redux/Services/institute/instituteServices";
import { formatOperationalDays } from "../../../../utils/inputValidations";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { allNigerianStates } from "../../../../utils/selectOptions";
import { triggerGetLocation } from "../../../../redux/Services/settings/settingsServices";
import { Button } from "@gpiiltd/gpi-ui-library";
// import { resetInstitutionState } from "../../../../redux/Services/institute/instituteSlice";

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [lgaDataOptions, setLgaDataOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const { userData } = useSelector((state: RootState) => state.user);
  const { institution } = useSelector((state: RootState) => state.institute);
  const { userProfileData, locationData } = useSelector(
    (state: RootState) => state.settings,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(triggerGetAllInstitution({ page: currentPage }) as any);
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (state) {
      dispatch(triggerGetLocation(state) as any);
    } else {
      setLgaDataOptions([]);
    }
  }, [dispatch, state]);

  useEffect(() => {
    if (locationData.data) {
      setLgaDataOptions(locationData.data);
    }
  }, [locationData]);

  useEffect(() => {
    if (institution) {
      if (currentPage === 1) {
        setInstitutions(institution.data?.results || []);
      } else {
        setInstitutions((prevInstitutions) => [
          ...prevInstitutions,
          ...(institution.data?.results || []),
        ]);
      }

      const isHasMore = institution.data?.next ? true : false;
      setHasMore(isHasMore);
      setIsLoading(false);
    }
    if (institution.error && institution.message) {
      setIsLoading(false);
    }
    // dispatch(resetInstitutionState());
  }, [institution, dispatch, currentPage]);

  const getRandomItems = (arr: string[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const suggestions = Array.isArray(institutions)
    ? getRandomItems(
        institutions.map((institution: any) => institution.name),
        3,
      )
    : [];

  const [showModal, setShowModal] = useState(false);

  const [buttonText, setButtonText] = useState("Location");

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted with:", query);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleFilter = () => {
    console.log("state>>>>>>", state);
    console.log("lga>>>>>>", lga);
    console.log("setButtonText>>>>>>", setButtonText);
  };

  const kycStatus = userProfileData?.data?.kyc_status || userData?.kyc_status;

  const handleTaskClick = (taskIdentifier: string) => {
    if (kycStatus === "approved") {
      navigate(
        `/verified-agent-dashboard/reports/hospitals/survey-list/${taskIdentifier}`,
      );
    } else {
      setTimeout(() => {
        toast.error(
          "You cannot perform this action as your KYC has not been approved",
        );
      }, 100);
    }
  };
  return (
    <div className="pb-20">
      <ToastContainer />
      <div className="flex gap-3 flex-col justify-center ">
        <div className="flex gap-3 items-center">
          <div onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={24} className="cursor-pointer" />
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-black font-extrabold"
          >
            Health institutes survey
          </Typography>
        </div>
        <Breadcrumb />

        <div className="flex flex-col justify-between w-full  md:flex-row">
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-light_gray"
          >
            Select a health institute to submit a survey report today and earn
            star points
          </Typography>
          <div className="flex gap-2 pt-3 flex-col justify-center md:gap-1  md:pt-0 md:flex-row">
            <SearchBar
              placeholder="Search for a clinic or hospital..."
              value={searchQuery}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              suggestions={suggestions}
            />
            <ButtonComponent
              text={buttonText}
              bg_color="#007A61"
              active={true}
              text_color="#FFFFFF"
              icon={<CiLocationOn size={30} />}
              onClick={openModal}
            />
          </div>
        </div>
      </div>

      {/*  */}
      {searchQuery !== "" && (
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-black font-extrabold pt-5"
        >
          Search result:
        </Typography>
      )}
      {institution.loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <ClipLoader color="#007A61" size={24} className="mr-6" />
          Loading...
        </div>
      ) : institutions?.filter((hospital: any) =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ).length === 0 ? (
        <div className="flex justify-center items-center pt-4">
          <div className="rounded-lg border border-gray-300 shadow-md p-4 w-full flex flex-col gap-4 justify-center items-center py-32">
            <Icon type="noData" />
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold"
            >
              No result found
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-light_gray"
            >
              Sorry, no available institute match your keyword. Find institute
              by location
            </Typography>
            <ButtonComponent
              text="Filter by location"
              bg_color="#007A61"
              active={true}
              text_color="#FFFFFF"
              onClick={openModal}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 pb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(institutions) && institutions.length > 0 ? (
              institutions
                .filter((hospital: any) =>
                  hospital.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .map((hospital: any, index: number) => (
                  <div
                    key={index}
                    className="border-[1px] border-solid border-[#D0D5DD] rounded-lg bg-white shadow-md p-2 mt-4"
                  >
                    <div className="py-4 px-6 mr-4">
                      <section className="flex justify-start">
                        {/* <Icon type="homeAvatar" className="pr-2" /> */}
                        {hospital.logo ? (
                          <img
                            src={hospital.logo}
                            alt="Institution Icon"
                            className="pr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full">
                            <span className="text-white p-2">
                              {hospital.name
                                ?.split(" ")
                                .map((word: string) => word[0])
                                .join("")}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="ml-2 font-bold text-black">
                            {hospital.name}
                          </p>
                          <p className="ml-2 font-normal text-[#5E5959]">
                            {/* {hospital.abbreviation} */}
                            {hospital.name
                              ?.split(" ")
                              .map((word: string) => word[0])
                              .join("")}
                          </p>
                        </div>
                      </section>
                      <p className="font-normal text-sm pt-3">
                        {hospital.address}
                      </p>
                      <div className="flex items-center justify-start pt-2">
                        <Icon type="timeClocKSvg" className="pr-2" />
                        <p className="font-normal text-sm text-[#5E5959] pr-1">
                          {formatOperationalDays(
                            hospital?.operation_days || "",
                          )}
                        </p>
                        <p className="font-normal text-sm">
                          ({hospital.closing_time} - {hospital.opening_time})
                        </p>
                      </div>
                    </div>
                    <div className="h-[1.5px] w-full bg-[#E4E7EC]"></div>
                    <div
                      className={`flex items-center justify-end pr-4 pt-2 mb-1 ${
                        kycStatus === "approved"
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      onClick={() => handleTaskClick(hospital.identifier)}
                    >
                      <p className="font-bold text-sm text-[#007A61] pr-1">
                        Give report
                      </p>
                      <Icon type="arrowUpSvg" className="pr-2" />
                    </div>
                  </div>
                ))
            ) : (
              <div>
                <p>Loading...</p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {hasMore && (
              <ButtonComponent
                text={isLoading ? "Loading..." : "Show more"}
                bg_color="transparent"
                active={!isLoading}
                text_color="#5E5959"
                border_color="#5E5959"
                onClick={() => !isLoading && handlePageChange(currentPage + 1)}
              />
            )}
          </div>
        </>
      )}
      {/*  */}

      <CustomModal
        width="45%"
        height="65%"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="flex flex-col  px-12 w-full">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-dark_gray font-semibold "
          >
            Filter
          </Typography>
          <div className="flex flex-col w-full">
            <div className="mt-5">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="state"
              >
                By State
              </label>
              <select
                name="state"
                value={state}
                onChange={(event) => setState(event.target.value)}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select state</option>
                {Array.isArray(allNigerianStates) &&
                  allNigerianStates.flat().map((option) => (
                    <option key={option.id} value={option.id.toString()}>
                      {option.name}
                    </option>
                  ))}
                {/* Add state options here */}
              </select>
            </div>

            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="localGovt"
              >
                By Local government
              </label>
              <select
                name="localGovt"
                value={lga}
                onChange={(event) => setLga(event.target.value)}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select local govt</option>
                {Array.isArray(lgaDataOptions) &&
                  lgaDataOptions.map((option) => (
                    <option key={option.id} value={option.id.toString()}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center my-8 gap-4  mx-16">
            <Button
              text="Clear filter"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
            />

            <Button
              text="Apply filter"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={handleFilter}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Hospitals;
