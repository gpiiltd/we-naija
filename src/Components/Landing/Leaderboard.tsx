import React, { useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import LandingBg from "../../Assets/svgImages/landing-bg.svg";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

// Define the tab type
type LeaderboardTab = "daily" | "weekly" | "monthly";

// Sample data
const leaderboardData: Record<
  LeaderboardTab,
  { name: string; points: number; level: string; icon?: string }[]
> = {
  daily: [
    { name: "Jizzyjeggs", points: 200, level: "Legend", icon: "gold" },
    { name: "Beaut112", points: 186, level: "Champion", icon: "silver" },
    { name: "Graceee", points: 176, level: "Champion", icon: "bronze" },
    { name: "Sholayyy", points: 152, level: "Guardian" },
    { name: "Peacemind", points: 146, level: "Guardian" },
    { name: "Gidiuup28...", points: 145, level: "Guardian" },
    { name: "Jizzyjeggs", points: 50, level: "Scout" },
    { name: "Jizzyjeggs", points: 48, level: "Scout" },
    { name: "Jizzyjeggs", points: 32, level: "Scout" },
    { name: "Jizzyjeggs", points: 30, level: "Scout" },
  ],
  weekly: [
    { name: "WeeklyChamp", points: 500, level: "Legend", icon: "gold" },
    { name: "WeeklyStar", points: 420, level: "Champion", icon: "silver" },
    { name: "Graceee", points: 390, level: "Champion", icon: "bronze" },
    { name: "GuardianX", points: 380, level: "Guardian" },
  ],
  monthly: [
    { name: "MonthMaster", points: 900, level: "Legend", icon: "gold" },
    { name: "MegaUser", points: 875, level: "Champion", icon: "silver" },
    { name: "ActivityKing", points: 860, level: "Champion", icon: "bronze" },
    { name: "ActiveBee", points: 800, level: "Guardian" },
  ],
};

const getMedalIcon = (icon: string) => {
  switch (icon) {
    case "gold":
      return <Icon type="icon1" className="h-30 w-30" />;
    case "silver":
      return <Icon type="icon2" className="h-30 w-30" />;
    case "bronze":
      return <Icon type="icon3" className="h-30 w-30" />;
    default:
      return null;
  }
};

const getCoinIcon = (level: string) => {
  switch (level) {
    case "Legend":
      return <Icon type="level1" className="" />;
    case "Champion":
      return <Icon type="level2" className="" />;
    case "Guardian":
      return <Icon type="level3" className="" />;
    default:
      return <Icon type="level4" className="" />;
  }
};

const Leaderboardd = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("daily");

  const tabLabels: Record<LeaderboardTab, string> = {
    daily: "Today",
    weekly: "This week",
    monthly: "All time",
  };

  return (
    <div className="bg-[#006C55] pb-10 relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${LandingBg})`,
          zIndex: 0,
        }}
      ></div>
      <div className="p-6 w-full relative z-10">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl text-center leading-10 font-bold text-white mb-6 mt-8"
        >
          LEADERBOARD
        </Typography>

        {/* Tabs */}
        <div className="bg-white rounded-md  mb-2 p-4 md:w-[25rem] lg:w-[20rem] mx-auto">
          <div className="flex gap-2 items-center justify-center">
            {Object.keys(tabLabels).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as LeaderboardTab)}
                className={`px-4 py-4 rounded-md text-sm font-medium ${
                  activeTab === tab
                    ? "bg-[#ED7D31] text-white shadow"
                    : "bg-white text-gray-600"
                }`}
              >
                {tabLabels[tab as LeaderboardTab]}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-white overflow-hidden">
          {/* Table layout for md and up */}
          <div className="hidden md:block max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-500">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Star Point</th>
                  <th className="px-6 py-3">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData[activeTab].map((user, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="px-6 py-4 font-bold">
                      {index < 3 ? getMedalIcon(user.icon!) : index + 1}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="bg-green-100 text-green-900 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-[#ED7D31] font-bold">
                      {user.points} SP
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      {getCoinIcon(user.level)}
                      <span>{user.level} level</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden p-4">
            {leaderboardData[activeTab].map((user, index) => (
              <Card
                key={index}
                className="flex items-center justify-between p-6 shadow-md mb-2"
              >
                <div className="flex items-center">
                  <div className="w-8 text-center text-lg font-bold">
                    {index < 3 ? getMedalIcon(user.icon!) : index + 1}
                  </div>
                  <div className="bg-green-100 text-green-900 rounded-full w-10 h-10 flex items-center justify-center mx-3">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      {user.level} level {getCoinIcon(user.level)}
                    </p>
                  </div>
                </div>
                <div className="text-[#ED7D31] font-bold text-sm">
                  {user.points} SP
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboardd;

const Card = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`bg-white w-full rounded-xl shadow-md ${className}`}>
    {children}
  </div>
);

// {
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
