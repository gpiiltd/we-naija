import React, { useState } from "react";
import { leaderboardData } from "./leaderboardData";
import backgroundImage from "../../Assets/svgImages/background.svg"; // Import the SVG file
import backgroundImage2 from "../../Assets/svgImages/background2.svg"; // Import the SVG file
import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import Icon from "../../Assets/SvgImagesAndIcons";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("daily");

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
  };
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };

  const userData = {
    rank: 51,
    name: "ASQBless John",
    points: 5,
    level: 1,
    badge: "Scout",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      <Typography variant={TypographyVariant.SUBTITLE} className="">
        Leaderboard
      </Typography>
      <div className="flex flex-col md:flex-row justify-center items-center  text-white rounded-lg p-4 mb-4 md:space-x-8 ">
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
            <Icon type="lineScout" className="w-10" />
            <span className=" px-2  text-sm">{userData.badge}</span>
            <span className="mx-2 ">|</span>
            <div className="flex items-center text-[#ED7D31] bg-white rounded-full px-4 font-semibold">
              <Icon type="starIcon" className="w-10" />
              <span className="text-sm">{userData.points} star points</span>
            </div>
          </div>
          <div className="w-[80%] bg-gray-200 rounded-full h-4 mt-6 flex justify-between items-center">
            <div
              className="bg-[#ED7D31] h-4 rounded-full "
              style={{ width: `${(userData.points / 10) * 100}%` }}
            ></div>{" "}
          </div>
          <div className="text-sm">Level {userData.level}</div>
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
      <div className="flex justify-center items-center space-x-4 mb-4 bg-gray-100 p-2 rounded-lg w-[22%] mx-auto">
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "daily" ? "bg-white text-black px-6" : "text-gray-500"
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
          Monthly
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-4xl">
          <thead>
            <tr className="text-gray-500 text-left">
              <th className="border-y-2 px-4 py-2">Rank</th>
              <th className="border-y-2 px-4 py-2">Name</th>
              <th className="border-y-2 px-4 py-2">Star Point</th>
              <th className="border-y-2 px-4 py-2">Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData[timeFrame as keyof typeof leaderboardData].map(
              (player) => (
                <tr key={player.name}>
                  <td className="border-y-2 px-4 py-2">{player.rank}</td>
                  <td className="border-y-2 px-4 py-2 flex items-center">
                    <div className="text-lg font-semibold bg-[#F0FEFB] rounded-full px-6 py-4 text-[#007A61]  mr-2">
                      {getInitials(player.name)}
                    </div>
                    {player.name}
                  </td>
                  <td className="border-y-2 px-4 py-2 text-[#ED7D31] font-semibold">
                    {player.points} SP
                  </td>
                  <td className="border-y-2 px-4 py-2">{player.badge}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
