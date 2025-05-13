import React, { useEffect, useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import LandingBg from "../../Assets/svgImages/landing-bg.svg";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { toast } from "react-toastify";
import { triggerGetAllLeaderboardDataPublic } from "../../redux/Services/leaderboard/LeaderboardService";
import { resetLeaderboardPublicState } from "../../redux/Services/leaderboard/leaderboardSlice";

// Define the tab type
// type LeaderboardTab = "daily" | "weekly" | "monthly";

// const getMedalIcon = (icon: string) => {
//   switch (icon) {
//     case "gold":
//       return <Icon type="icon1" className="h-30 w-30" />;
//     case "silver":
//       return <Icon type="icon2" className="h-30 w-30" />;
//     case "bronze":
//       return <Icon type="icon3" className="h-30 w-30" />;
//     default:
//       return null;
//   }
// };

const getCoinIcon = (badge: string) => {
  switch (badge.toUpperCase()) {
    case "LEGEND":
      return <Icon type="level1" className="w-6 h-6" />;
    case "CHAMPION":
      return <Icon type="level2" className="w-6 h-6" />;
    case "GUARDIAN":
      return <Icon type="level3" className="w-6 h-6" />;
    case "SCOUT":
      return <Icon type="level4" className="w-6 h-6" />;
    default:
      return null;
  }
};

const Leaderboardd = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [visibleCount, setVisibleCount] = useState(10);
  const [allLeaderboardData, setAllLeaderboardData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // const tabLabels: Record<LeaderboardTab, string> = {
  //   daily: "Today",
  //   weekly: "This week",
  //   monthly: "All time",
  // };

  const { leaderboardDataPublic } = useSelector(
    (state: RootState) => state.leaderboard,
  );
  const payload = {
    page: currentPage,
    timeframe: timeFrame,
  };

  useEffect(() => {
    dispatch(triggerGetAllLeaderboardDataPublic(payload) as any);
  }, [dispatch, timeFrame]);

  useEffect(() => {
    if (
      leaderboardDataPublic.statusCode === 200 &&
      leaderboardDataPublic.data
    ) {
      if (currentPage === 1) {
        setAllLeaderboardData(leaderboardDataPublic.data.results);
      } else {
        setAllLeaderboardData((prevData) => [
          ...prevData,
          ...leaderboardDataPublic.data.results,
        ]);
      }
    }

    if (leaderboardDataPublic.error && leaderboardDataPublic.message) {
      toast.error(leaderboardDataPublic.message);
    }
    dispatch(resetLeaderboardPublicState());
  }, [leaderboardDataPublic, dispatch, currentPage]);

  console.log("leaderboardData***", leaderboardDataPublic);
  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
    setVisibleCount(10);
    setCurrentPage(1);
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };
  const capitalizeName = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const tableData = allLeaderboardData;
  const displayedTableData = tableData.slice(0, visibleCount);
  //const allBadges = leaderboardDataPublic.data.badges;

  // useEffect(() => {
  //   dispatch(
  //     triggerGetAllLeaderboardDataPublic({
  //       timeframe: mapTabToBackendTimeframe[activeTab],
  //       page: 1,
  //     })
  //   );
  // }, [dispatch, activeTab]);

  //const leaderboardData = leaderboardState.data || [];

  return (
    <div className="bg-[#006C55] pb-10 relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${LandingBg})`, zIndex: 0 }}
      ></div>

      <div className="p-6 w-full relative z-10">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl font-raleway text-center leading-10 font-bold text-white mb-6 mt-8"
        >
          LEADERBOARD
        </Typography>

        {/* Tabs */}
        <div className="flex justify-center items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-full md:w-[50%] lg:w-[32%] mx-auto">
          <button
            className={`px-4 py-2 rounded font-raleway  ${
              timeFrame === "today"
                ? "bg-[#ED7D31] text-white px-2 md:px-6"
                : "text-gray-500"
            }`}
            onClick={() => handleTimeFrameChange("today")}
          >
            Today
          </button>
          <button
            className={`px-4 py-2 rounded  font-raleway ${
              timeFrame === "this_week"
                ? "bg-[#ED7D31] text-white "
                : "text-gray-500"
            }`}
            onClick={() => handleTimeFrameChange("this_week")}
          >
            This week
          </button>
          <button
            className={`px-4 py-2 rounded font-raleway  ${
              timeFrame === "all_time"
                ? "bg-[#ED7D31] text-white"
                : "text-gray-500"
            }`}
            onClick={() => handleTimeFrameChange("all_time")}
          >
            All time
          </button>
        </div>

        <div className="bg-white overflow-x-auto rounded-3xl border-2 border-b-0 font-raleway">
          <table className="min-w-full  rounded-t-3xl font-raleway">
            <thead>
              <tr className="text-gray-500 font-semibold text-left border-b-2 py-12 rounded-t-3xl font-raleway">
                <th className=" px-4 py-6">Rank</th>
                <th className=" px-4 py-6">Name</th>
                <th className=" px-4 py-6">Star Point</th>
                <th className=" px-4 py-6">Badges</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.length > 0 ? (
                displayedTableData.map((player: any, index: any) => (
                  <tr key={player.full_name} className="border-b-2">
                    <td
                      className={` px-4 py-2 items-center justify-center ${index <= 3 ? "ml-16" : ""}`}
                    >
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

                    <td className="px-4 py-2 flex items-center text-gray-500 w-64">
                      {getCoinIcon(player.badge)}
                      <span className="ml-2 font-raleway ">{player.badge}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 font-raleway ">
                    No data available
                  </td>
                </tr>
              )}
              {/* Show more rows */}
              {(visibleCount < tableData.length ||
                leaderboardDataPublic.data?.next) && (
                <tr>
                  <td colSpan={4} className="text-center border-b relative">
                    {/* <button
                    onClick={handleShowMore}
                    className="text-black hover:underline text-3xl pb-8 font-semibold"
                    aria-label="Show more"
                  >
                    ...
                  </button> */}
                    <span className="font-raleway absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                      Show more
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboardd;

// const Card = ({
//   children,
//   className = "",
// }: React.PropsWithChildren<{ className?: string }>) => (
//   <div className={`bg-white w-full rounded-xl shadow-md ${className}`}>
//     {children}
//   </div>
// );

//   /* <Card
//           key={index}
//           className="flex items-center justify-between p-4 shadow-md"
//         >
//           <div className="flex items-center">
//             <div className="w-8 text-center text-lg font-bold">
//               {index < 3 ? getMedalIcon(user.icon!) : index + 1}
//             </div>
//             <div className="bg-green-100 text-green-900 rounded-full w-10 h-10 flex items-center justify-center mx-3">
//               {user.name.slice(0, 2).toUpperCase()}
//             </div>
//             <div className="flex flex-col items-start">
//               <p className="font-semibold text-sm">{user.name}</p>
//               <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
//                 {user.level} level {getCoinIcon(user.level)}
//               </p>
//             </div>
//           </div>
//           <div className="text-[#ED7D31] font-bold text-sm">
//             {user.points} SP
//           </div>
//         </Card> */
// }
