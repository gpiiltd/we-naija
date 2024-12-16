import { useState } from "react";
import { leaderboardData } from "./leaderboardData";
import backgroundImage from "../../Assets/svgImages/background.svg";
import backgroundImage2 from "../../Assets/svgImages/background2.svg";
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import Icon from "../../Assets/SvgImagesAndIcons";
import LevelBar from "./levelBar";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("daily");
  const [visibleCount, setVisibleCount] = useState(10);

  const selectedTimeFrame =
    leaderboardData[timeFrame as keyof typeof leaderboardData];

  const sortedLeaderboardData = [...selectedTimeFrame].sort(
    (a, b) => b.points - a.points
  );

  const displayedItems = sortedLeaderboardData.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 10, selectedTimeFrame.length)
    );
  };

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };

  const badgeIconMap: { [key: string]: string } = {
    "Scout level": "lineScout",
    "Guardian level": "lineGuardian",
    "Champion level": "lineChampion",
    "Legend level": "lineLegend",
  };

  const userData = {
    rank: 51,
    name: "ASQBless John",
    points: 5,
    level: 9,
    badge: "Scout",
  };

  return (
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
            Rank #{userData.rank}
          </div>
          <div className="text-lg font-semibold bg-white rounded-full px-5 py-4 text-[#007A61]  mb-2">
            {getInitials(userData.name)}
          </div>
          <div className="text-lg font-semibold">{userData.name}</div>
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center justify-center">
              <Icon type="lineScout" className="w-10 pt-2" />
              <span className=" pl-1 text-sm font-semibold">
                {userData.badge}
              </span>
            </div>
            <span className="mx-4 text-3xl">|</span>
            <div className="flex items-center justify-center  bg-white rounded-full px-4">
              <Icon type="starIcon" className="w-10" />
              <span className="text-sm font-semibold text-[#ED7D31]">
                {userData.points} star points
              </span>
            </div>
          </div>

          <div className="w-full px-5 mt-8">
            <LevelBar level={userData.level} />
          </div>
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
          <div className="flex space-x-2 mt-1">
            <div className=" ">
              <Icon type="scoutIcon" className="w-32 h-36" />
            </div>
            <div className="relative ">
              <Icon type="guardianIcon" className="w-32 h-36 opacity-50" />
              <Icon
                type="lockIcon"
                className="w-10 h-10 absolute bottom-0 left-0"
              />
            </div>
            <div className="relative ">
              <Icon type="championIcon" className="w-32 h-36 opacity-50" />
              <Icon
                type="lockIcon"
                className="w-10 h-10 absolute bottom-0 left-0"
              />
            </div>
            <div className="relative ">
              <Icon type="legendIcon" className="w-32 h-36 opacity-50" />
              <Icon
                type="lockIcon"
                className="w-10 h-10 absolute bottom-0 left-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-full md:w-[50%] lg:w-[32%] mx-auto">
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "daily"
              ? "bg-white text-black px-2 md:px-6"
              : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("daily")}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "weekly" ? "bg-white text-black" : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "monthly" ? "bg-white text-black" : "text-gray-500"
          }`}
          onClick={() => handleTimeFrameChange("monthly")}
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
            {displayedItems.map((player, index) => (
              <tr key={player.name} className="border-b-2">
                <td className=" px-4 py-2 items-center justify-center">
                  {index < 3 ? (
                    <Icon type={`medal${index + 1}`} className="w-10 h-10" />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className=" px-4 py-2 flex items-center w-64">
                  <div className="text-xs md:text-lg font-semibold bg-[#F0FEFB] rounded-full px-2 py-2 md:px-6 md:py-4  text-[#007A61] mr-2">
                    {getInitials(player.name)}
                  </div>
                  {player.name}
                </td>
                <td className=" px-4 py-2  text-[#ED7D31] font-semibold w-64  gap-2">
                  <span className="text-sm mr-2">{player.points}</span>
                  <span className="text-sm">SP</span>
                </td>
                <td className=" px-4 py-2 flex items-center text-gray-500 w-64">
                  <Icon
                    type={badgeIconMap[player.badge] || "lineScout"}
                    className="w-6 h-6 mr-2 "
                  />
                  {player.badge}
                </td>
              </tr>
            ))}
            {/* Show more rows */}
            {visibleCount < selectedTimeFrame.length && (
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
  );
};

export default Leaderboard;
