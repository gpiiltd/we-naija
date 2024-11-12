import Footer from "../../Components/Footer";
import Icon from "../../Assets/SvgImagesAndIcons";
import { TypographyVariant } from "../../Components/types";
import Header from "../../Components/Header";
import { FiSettings, FiBell, FiX, FiUsers, FiMenu } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";


import { useState } from "react";
import ProgressBar from "../../Components/Home/ProgressBar";
import VerificationCard from "../../Components/Home/VerificationCard";
import HomeGoToReportCard from "../../Components/Home/GoToReportCard";
import backgroundImage from '../../Assets/svgImages/reportCardBg.svg';
import bigGirlSvg from "../../Assets/svgImages/bgGirl.svg";
import InstitutionsCard from "../../Components/Home/Institution_card";
import SurveysCard from "../../Components/Home/SurveyCard";
import Typography from "../../Components/Typography";
import { NavLink } from "react-router-dom";


const VADashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto flex flex-col ">
      <Header className="w-full px-4 md:px-6 lg:px-12">
        <div className="flex flex-row gap-4 md:gap-12 w-full items-center justify-between">
          <button onClick={toggleDrawer} className="md:hidden text-gray-700">
            <FiMenu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <Icon type="logo" className="w-fit" />

            <nav className="hidden md:block pt-2">
              <ul className="flex justify-center items-center text-sm md:text-xs lg:text-base lg:gap-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                        : "px-2 py-2 font-thin hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-300"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                        : "px-2 py-2 font-thin hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-300"
                    }
                  >
                    Report
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                        : "px-2 py-2 font-thin hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-300"
                    }
                  >
                    Leaderboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                        : "px-2 py-2 font-thin hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-300"
                    }
                  >
                    Join Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                        : "px-2 py-2 font-thin hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-300"
                    }
                  >
                    Settings
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex justify-center items-center gap-4 text-gray-700">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                    : "hidden px-2 py-2 font-thin hover:text-primary_green hover:font-normal transition duration-300 md:block"
                }
              >
                <FiSettings size={20} />
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                    : "hidden px-2 py-2 font-thin hover:text-primary_green hover:font-normal transition duration-300 md:block"
                }
              >
                <FiBell size={20} />
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-2 text-primary_green bg-effect_green font-normal"
                    : "px-2 py-2 font-thin hover:text-primary_green hover:font-normal transition duration-300"
                }
              >
                <Icon type="avatar" />
              </NavLink>
            </nav>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={toggleDrawer}
            ></div>
            <div
              className={`fixed top-0 left-0 h-full w-10/12 bg-white z-50 px-6 shadow-inner transform transition-transform duration-300 ${
                isDrawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex flex-col justify-between h-full pb-48">
                <div className="flex flex-col pt-8">
                  <div className="flex justify-between items-center">
                    <Icon type="logo" />
                    <button onClick={toggleDrawer} className="text-lg">
                      <FiX size={24} className="text-gray-500" />
                    </button>
                  </div>

                  <nav className="flex flex-col pt-8">
                    <ul className="space-y-6 text-lg">
                      <li className="flex gap-2">
                        <Icon type="home" />
                        <NavLink
                          to="/"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <Icon type="report" />
                        <NavLink
                          to="/about"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Report
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <Icon type="cup" />
                        <NavLink
                          to="/contact"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Leaderboard
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <FiUsers
                          size={24}
                          className="text-gray-600 text-primary_green text-lg"
                        />
                        <NavLink
                          to="/community"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Join Community
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <FiBell
                          size={24}
                          className="text-gray-600 text-primary_green text-lg"
                        />
                        <NavLink
                          to="/community"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Notification
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <FiSettings
                          size={24}
                          className="text-gray-600 text-primary_green text-lg"
                        />
                        <NavLink
                          to="/settings"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Settings
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="flex gap-2">
                  <CiLogout size={24} className="text-error text-lg" />
                  <NavLink
                    to="/"
                    onClick={toggleDrawer}
                    className={({ isActive }) =>
                      isActive
                        ? "text-error font-bold"
                        : "text-error font-bold font-thin hover:text-error transition duration-300"
                    }
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </Header>

      {/* Page content */}
      {/* <main className="flex-grow bg-blue-500 sm:bg-green-500 md:bg-red-500 lg:bg-yellow-500 xl:bg-purple-500">  */}
      <main className="flex-grow mx-5 my-8 sm:mx-9 md:mx-12 lg:mx-12"> 
        <div className="w-full h-[160vh] overscroll-contain">
        
        <div className="w-full  items-start">
         <div className="flex ">
           <Icon type="arrowBackSvg" className="mr-8" />
           <div className="flex justify-start items-center">
            <Icon type="homeAvatar" className="pr-2 size-12" />
            <p className="font-bold text-lg">Quotient Specialist Hospital (QSH)</p>
            </div>
         </div>
         <div className="w-[70vw] pl-0 pr-4 lg:pl-16 lg:pr-48 md:pl-16 md:pr-48  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 pb-16 mt-4">
              {/* 1 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="locationGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">No 5, Lekki view, Lagos Island, Lagos state. Ngeria</p>
            </div>

            {/* 2 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="timeGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">Monday - Sunday (24 hours)</p>
            </div>

            {/* 3 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="callingGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">08105201636</p>
            </div>

            {/* 4 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="messageGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">Quotientspecialist@gmail.com</p>
            </div>

          </div>

          <p className="font-bold text-lg">Survey list (4)</p>
          <p className="font-normal text-sm text-[#5E5959] mt-2">Kindly select the survey indicator you would like to report<br />on this institution.</p>
          
        </div>

        <SurveysCard responseTimeMessage="Acceptability of services" statusMessage="Lorem ipsum dolor sit amet consectetur. Orci enim pulvinar pulvinar adipiscing." progressPercentage={45} />

        {/* This is the last content */}
        <div className="w-full bg-slate-200 mt-16 flex px-40 py-14 rounded-lg font-bold text-lg">
          <div className="w-full flex justify-between items-center">
            <p>Have generic feedback or reports on this facility?</p>
            <div className="flex ">
            {/* <button className="border-[1.5px] border-[#5E5959] rounded-lg mt-6 text-[#5E5959] text-sm font-bold items-center px-[5rem] py-[1rem] lg:px-[7rem] sm:px-[5rem] md:px-[5rem]">Show more</button> */}
              
              <button className="border-[1.5px] px-14 py-3 border-[#5E5959] rounded-lg text-black text-sm font-bold mr-5">Upload images</button>
              <button className="bg-[#007A61] px-14 py-3 rounded-lg  text-white text-sm font-normal">Write a report</button>
            </div>
          </div>

        </div>
        </div>
      </main>

      <Footer bg_color="black" className="px-8 md:px-6  lg:px-12">
        <div className="border-b border-gray-800 md:mb-8 pb-4">
          <div className="flex flex-col gap-4  md:flex-row md:justify-between">
            <Icon type="wenaija" className="w-fit" />
            <div className="text-cream  ">
              <ul className="flex md:space-x-6">
                <li className="cursor-pointer">
                  <Icon type="linkedin" />
                </li>
                <li className="cursor-pointer">
                  <Icon type="facebook" />
                </li>
                <li className="cursor-pointer">
                  <Icon type="twitter" />
                </li>
                <li className="cursor-pointer">
                  <Icon type="instagram" />
                </li>
              </ul>
            </div>
          </div>

          <nav className="text-cream text-xs py-4 ">
            <ul className="flex flex-col gap-4 md:flex-row">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-thin"
                      : " font-thin hover:text-gray-300 transition duration-200"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-thin"
                      : "font-thin hover:text-gray-300 transition duration-200"
                  }
                >
                  Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-thin"
                      : "font-thin hover:text-gray-300 transition duration-200"
                  }
                >
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-thin"
                      : "font-thin hover:text-gray-300 transition duration-200"
                  }
                >
                  Join community
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-thin text-xs"
                      : "font-thin hover:text-gray-300 transition duration-200"
                  }
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="text-cream py-4 text-xs font-thin flex flex-col gap-4 md:flex-row md:justify-between  ">
          <Typography variant={TypographyVariant.SMALL}>
            © 2024 Wenailja. All rights reserved.
          </Typography>
          <ul className="flex space-x-6">
            <li className="cursor-pointer">Terms</li>
            <li className="cursor-pointer">Privacy </li>
            <li className="cursor-pointer">Cookies </li>
          </ul>
        </div>
      </Footer>
    </div>
  );
};

export default VADashboard;


