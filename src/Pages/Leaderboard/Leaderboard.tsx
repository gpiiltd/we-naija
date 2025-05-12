import { useEffect, useState } from "react";
import backgroundImage from "../../Assets/svgImages/background.svg";
import backgroundImage2 from "../../Assets/svgImages/background2.svg";
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import Icon from "../../Assets/SvgImagesAndIcons";
import { ClipLoader } from "react-spinners";
// import LevelBar from "./levelBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/Store/store";
import { triggerGetAllLeaderboardData } from "../../redux/Services/leaderboard/LeaderboardService";
import { toast, ToastContainer } from "react-toastify";
// import { resetLeaderboardState } from "../../redux/Services/leaderboard/leaderboardSlice";
import { capitalizeName } from "../../utils/inputValidations";
import { Player, Badge } from "../../utils/interfaces";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [visibleCount, setVisibleCount] = useState(10);
  const [allLeaderboardData, setAllLeaderboardData] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const { leaderboardData } = useSelector(
    (state: RootState) => state.leaderboard,
  );
  const payload = {
    page: currentPage,
    timeframe: timeFrame,
  };

  useEffect(() => {
    dispatch(triggerGetAllLeaderboardData(payload));
  }, [dispatch, timeFrame]);

  useEffect(() => {
    if (leaderboardData.statusCode === 200 && leaderboardData.data?.results) {
      const results = Array.isArray(leaderboardData.data.results)
        ? leaderboardData.data.results
        : [];

      if (currentPage === 1) {
        setAllLeaderboardData(results);
      } else {
        setAllLeaderboardData((prevData) => [...prevData, ...results]);
      }
    }

    if (leaderboardData.error && leaderboardData.message) {
      toast.error(leaderboardData.message);
    }
  }, [leaderboardData, dispatch, currentPage]);

  const handleShowMore = () => {
    if (leaderboardData.data?.next) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const newPayload = {
        ...payload,
        page: nextPage,
      };
      dispatch(triggerGetAllLeaderboardData(newPayload));
    } else {
      setVisibleCount((prevCount) =>
        Math.min(prevCount + 10, allLeaderboardData.length),
      );
    }
  };

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
    setVisibleCount(10);
    setCurrentPage(1);
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };

  const tableData = allLeaderboardData || [];
  const displayedTableData = tableData?.slice(0, visibleCount) || [];
  const userProfileData = leaderboardData.data?.user_profile;
  const allBadges = leaderboardData.data?.badges;

  if (leaderboardData.error) {
    return (
      <div className="flex justify-center items-center w-[50%] h-full p-6 bg-white rounded-lg mx-auto mb-12">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-lg md:text-2xl text-red-500 text-center"
        >
          You cannot perform this action as your KYC hasn't been approved
        </Typography>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {leaderboardData.loading ? (
        <div className="flex justify-center items-center w-full h-full p-6 bg-white rounded-lg mx-auto mb-12">
          <ClipLoader color="#007A61" size={24} className="mr-6" />
          Loading...
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg  w-full mx-auto mb-12">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-lg md:text-2xl"
          >
            Leaderboard
          </Typography>
          <div className="flex flex-col md:flex-row justify-center items-center  text-white rounded-lg py-4 mb-4 md:space-x-8 ">
            <div
              className="relative w-full md:w-[50%] h-[300px] rounded-xl flex flex-col items-center justify-center bg-[#007A61] mb-4 md:mb-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className=" absolute top-8 right-8 font-semibold">
                Rank #{userProfileData?.rank || "NA"}
              </div>
              <div className="text-lg font-semibold bg-white rounded-full px-5 py-4 text-[#007A61]  mb-2">
                {getInitials(userProfileData?.full_name || "")}
              </div>
              <div className="text-2xl font-semibold my-4">
                {capitalizeName(userProfileData?.full_name || "")}
              </div>
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      allBadges?.find(
                        (badge: Badge) => badge.name === userProfileData?.badge,
                      )?.logo || ""
                    }
                    alt={`Badge ${userProfileData?.badge}`}
                    className="w-10 h-10"
                  />
                  <span className=" pl-1 text-sm font-semibold">
                    {userProfileData?.badge || "NA"}
                  </span>
                </div>
                <span className="mx-4 text-3xl">|</span>
                <div className="flex items-center justify-center  bg-white rounded-full px-4">
                  <Icon type="starIcon" className="w-10" />
                  <span className="text-sm font-semibold text-[#ED7D31]">
                    {userProfileData?.total_sp || 0} star points
                  </span>
                </div>
              </div>

              {/* <div className="w-full px-5 mt-8">
            <LevelBar level={userProfileData?.level || 0} />
          </div> */}
            </div>

            <div
              className=" w-full md:w-[50%] h-[300px] rounded-xl flex flex-col items-center justify-center bg-white border border-gray-200"
              style={{
                backgroundImage: `url(${backgroundImage2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-left">
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className=" text-left text-black "
                >
                  Badges
                </Typography>
              </div>
              <div className="flex space-x-4 mt-1">
                {allBadges?.map((badge: Badge, index: number) => (
                  <div className="relative bg-white  rounded-3xl p-4 border border-gray-200">
                    <div className="">
                      <Typography
                        variant={TypographyVariant.NORMAL}
                        className="text-black text-center"
                      >
                        {badge.name}
                      </Typography>
                      <img
                        key={index}
                        src={badge.logo}
                        alt={`Badge ${index}`}
                        className="w-24 h-28"
                      />
                    </div>
                    {allBadges?.findIndex(
                      (b: Badge) => b.name === userProfileData?.badge,
                    ) < index && (
                      <div className="relative group">
                        <Icon
                          type="lockIcon"
                          className="w-10 h-10 absolute bottom-0 left-0"
                        />
                        <div className="absolute bottom-90 left-0 hidden group-hover:block bg-black text-white text-xs rounded-2xl p-4 w-64 z-10">
                          <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black"></div>
                          <span className="font-bold">
                            {`Unlock ${badge.name} badge`}
                          </span>
                          <h2 className="my-2">
                            Earn
                            <span className="text-[#ED7D31] font-bold">
                              {` ${badge.minimum_sp} star points `}
                            </span>
                            <span>
                              by completing reports to unlock the
                              {badge.name} badge
                            </span>
                          </h2>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-full md:w-[50%] lg:w-[32%] mx-auto">
            <button
              className={`px-4 py-2 rounded ${
                timeFrame === "today"
                  ? "bg-white text-black px-2 md:px-6"
                  : "text-gray-500"
              }`}
              onClick={() => handleTimeFrameChange("today")}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timeFrame === "this_week"
                  ? "bg-white text-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTimeFrameChange("this_week")}
            >
              This week
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timeFrame === "all_time"
                  ? "bg-white text-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTimeFrameChange("all_time")}
            >
              All time
            </button>
          </div>

          <div className="overflow-x-auto rounded-3xl border-2 border-b-0">
            <table className="min-w-full  rounded-t-3xl">
              <thead>
                <tr className="text-gray-500 font-semibold text-left border-b-2 py-12 rounded-t-3xl">
                  <th className=" px-4 py-6">Rank</th>
                  <th className=" px-4 py-6">Name</th>
                  <th className=" px-4 py-6">Star Point</th>
                  <th className=" px-4 py-6">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.loading ? (
                  <div className="flex gap-3 items-center justify-center my-12">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-center"
                    >
                      Loading leaderboard data...
                    </Typography>
                  </div>
                ) : displayedTableData?.length > 0 ? (
                  displayedTableData.map((player: Player, index: number) => (
                    <tr key={player.full_name} className="border-b-2">
                      <td className=" px-4 py-2 items-center justify-center">
                        {index < 3 ? (
                          <Icon
                            type={`medal${index + 1}`}
                            className="w-10 h-10"
                          />
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className=" px-4 py-2 flex items-center w-64">
                        <div className="text-xs md:text-lg font-semibold bg-[#F0FEFB] rounded-full px-2 py-2 md:px-6 md:py-4  text-[#007A61] mr-2">
                          {getInitials(player.full_name)}
                        </div>
                        {capitalizeName(player.full_name)}
                      </td>
                      <td className=" px-4 py-2  text-[#ED7D31] font-semibold w-64  gap-2">
                        <span className="text-sm mr-2">{player.total_sp}</span>
                        <span className="text-sm">SP</span>
                      </td>
                      <td className=" px-4 py-2 flex items-center text-gray-500 w-64">
                        <img
                          src={
                            allBadges?.find(
                              (badge: Badge) => badge.name === player.badge,
                            )?.logo || ""
                          }
                          alt={`Badge ${player.badge}`}
                          className="w-8 h-8 mr-2"
                        />
                        {player.badge}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}

                {(visibleCount < (tableData?.length || 0) ||
                  leaderboardData.data?.next) && (
                  <tr>
                    <td colSpan={4} className="text-center border-b relative">
                      <button
                        onClick={handleShowMore}
                        className="text-black hover:underline text-3xl pb-8 font-semibold"
                        aria-label="Show more"
                      >
                        ...
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        Show more
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
