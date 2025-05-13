import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Typography from "../../../../Components/Typography";
import { TypographyVariant } from "../../../../Components/types";
import SearchBar from "../../../../Components/Searchbar";
import ButtonComponent from "../../../../Components/ButtonComponent";
// import { CiLocationOn } from "react-icons/ci";
import Icon from "../../../../Assets/SvgImagesAndIcons";
import CustomModal from "../../../../Components/Modal";
import { AiOutlineDown } from "react-icons/ai";
import Breadcrumb from "../BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store/store";
import { triggerGetAllInstitution } from "../../../../redux/Services/institute/instituteServices";
import { formatOperationalDays } from "../../../../utils/inputValidations";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
// import { resetInstitutionState } from "../../../../redux/Services/institute/instituteSlice";

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const { institution } = useSelector((state: RootState) => state.institute);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(triggerGetAllInstitution({ page: currentPage }) as any);
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];
  const cities = [
    "Ikeja",
    "Maitama",
    "Sabon Gari",
    "Port Harcourt",
    "Zaria",
    "Ibadan",
  ];
  // const [buttonText, setButtonText] = useState("Location");

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted with:", query);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const [stateDropdown, setStateDropdown] = useState({
    selected: "",
    isOpen: false,
  });

  const [cityDropdown, setCityDropdown] = useState({
    selected: "",
    isOpen: false,
  });

  const handleStateSelect = (state: string) => {
    setStateDropdown({ selected: state, isOpen: false });
  };

  const handleCitySelect = (city: string) => {
    setCityDropdown({ selected: city, isOpen: false });
  };
  const handleFilter = () => {
    if (cityDropdown.selected && stateDropdown.selected) {
      setIsLoading(!isLoading);
      setTimeout(() => {
        setIsLoading(false);
        // setButtonText(`${cityDropdown.selected}, ${stateDropdown.selected}`);
        setShowModal(false);
      }, 3000);
    } else {
      // setButtonText("Location");
      setShowModal(false);
    }
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setStateDropdown({ selected: "", isOpen: false });
    setCityDropdown({ selected: "", isOpen: false });
    // setButtonText("Location");
  };

  const kycStatus = localStorage.getItem("kyc_status") || userData?.kyc_status;

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
            {/* <ButtonComponent
              text={buttonText}
              bg_color="#007A61"
              active={true}
              text_color="#FFFFFF"
              icon={<CiLocationOn size={30} />}
              onClick={openModal}
            /> */}
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

      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="py-2 flex flex-col">
          <div className="flex flex-col gap-4 justify-center ">
            <div className="border-b text-center pb-4">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold"
              >
                Location Filter
              </Typography>
            </div>

            <div className="flex flex-col gap-4 px-4">
              {/* State Input */}
              <div className="relative ">
                <label className="text-sm font-medium mb-1">By State</label>
                <input
                  type="text"
                  value={stateDropdown.selected}
                  placeholder="Select state"
                  readOnly
                  onClick={() =>
                    setStateDropdown({
                      ...stateDropdown,
                      isOpen: !stateDropdown.isOpen,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  className="absolute right-2 top-10 cursor-pointer text-gray-500"
                  onClick={() =>
                    setStateDropdown({
                      ...stateDropdown,
                      isOpen: !stateDropdown.isOpen,
                    })
                  }
                >
                  <AiOutlineDown size={20} />
                </div>
                {stateDropdown.isOpen && (
                  <ul className="absolute w-full border border-gray-300 bg-white rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
                    {states.map((state, index) => (
                      <li
                        key={index}
                        onClick={() => handleStateSelect(state)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* City Input */}
              <div className="relative w-full">
                <label className="text-sm font-medium mb-1">By City</label>
                <input
                  type="text"
                  value={cityDropdown.selected}
                  placeholder="Select city"
                  readOnly
                  onClick={() =>
                    setCityDropdown({
                      ...cityDropdown,
                      isOpen: !cityDropdown.isOpen,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  className="absolute right-2 top-10 cursor-pointer text-gray-500"
                  onClick={() =>
                    setCityDropdown({
                      ...cityDropdown,
                      isOpen: !cityDropdown.isOpen,
                    })
                  }
                >
                  <AiOutlineDown size={20} />
                </div>
                {cityDropdown.isOpen && (
                  <ul className="absolute w-full border border-gray-300 bg-white rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
                    {cities.map((city, index) => (
                      <li
                        key={index}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 pb-3 border-t mt-4">
              <div className="px-4 cursor-pointer" onClick={handleClearAll}>
                <Typography variant={TypographyVariant.NORMAL}>
                  Clear all
                </Typography>
              </div>
              <div className="px-4">
                {" "}
                <ButtonComponent
                  text="Show 50+ Institute"
                  bg_color="#007A61"
                  active={true}
                  text_color="#FFFFFF"
                  onClick={handleFilter}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Hospitals;
