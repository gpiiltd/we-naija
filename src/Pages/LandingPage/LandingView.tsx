import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import Icon from "../../Assets/SvgImagesAndIcons";
import { NavLink } from "react-router-dom";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Header from "../../Components/Header";

import { FiX, FiMenu } from "react-icons/fi";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";

const LandingView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div>
      {/* header view */}
      <Header
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-md bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex flex-row gap-4 px-4 py-4 md:px-6 lg:px-40 md:gap-12 w-full items-center justify-between ">
          <button onClick={toggleDrawer} className="md:hidden text-gray-700">
            <FiMenu size={24} />
          </button>

          <div className="flex items-center">
            <div className="flex items-center">
              <Icon
                type="logo"
                className="w-fit"
                click={() =>
                  (window.location.href = "/verified-agent-dashboard")
                }
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8 text-[#575757] font-light">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary_green font-medium"
                  : "hover:text-primary_green transition"
              }
            >
              About us
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary_green font-medium"
                  : "hover:text-primary_green transition"
              }
            >
              Leaderboards
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-primary_green font-medium"
                  : "hover:text-primary_green transition"
              }
            >
              Contact us
            </NavLink>
          </nav>
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
                    <Icon
                      type="logo"
                      className="w-fit"
                      click={() =>
                        (window.location.href = "/verified-agent-dashboard")
                      }
                    />
                    <button onClick={toggleDrawer} className="text-lg">
                      <FiX size={24} className="text-gray-500" />
                    </button>
                  </div>

                  <nav className="flex flex-col pt-8 text-md text-[#17191C] font-semibold">
                    <ul className="space-y-6 ">
                      <li className="flex gap-2 ">
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
                        <NavLink
                          to="/"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          About Us
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <NavLink
                          to="/verified-agent-dashboard/leaderboard"
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
                        <NavLink
                          to="/contact"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>

                    <div className="w-full mt-8 flex flex-row">
                      <Button
                        text="Send message"
                        // active={isValid && dirty}
                        active={true}
                        bg_color="#007A61"
                        text_color="white"
                        loading={false}
                        onClick={() => {}}
                      />
                      <Button
                        text="Join community"
                        // active={isValid && dirty}
                        active={true}
                        bg_color="#ED7D31"
                        text_color="white"
                        loading={false}
                        onClick={() => {}}
                      />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </Header>

      <main className="w-full">
        <Outlet />
      </main>

      {/* footer view */}
      <Footer bg_color="black" className="px-8 md:px-6  lg:px-16">
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
          <ul className="flex space-x-3">
            <li className="cursor-pointer">Terms</li>
            <li className="cursor-pointer">Privacy </li>
            <li className="cursor-pointer">Cookies </li>
          </ul>
        </div>
      </Footer>
    </div>
  );
};

export default LandingView;
