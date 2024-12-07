import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

const SettingsMobile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full  bg-[#E3E3E359]">
      {/* <Header className="px-4 md:px-6 lg:px-16">
        <div className="flex flex-row gap-4 md:gap-12 w-full items-center justify-between">
          <button onClick={toggleDrawer} className="md:hidden text-gray-700">
            <FiMenu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <Icon
              type="logo"
              className="w-fit cursor-pointer"
              click={() => (window.location.href = "/verified-agent-dashboard")}
            />

            <nav className="hidden md:block pt-2">
              <ul className="flex justify-center items-center text-sm md:text-xs lg:text-base lg:gap-4">
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/home"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                        : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/reports"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                        : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Report
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/leaderboard"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                        : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Leaderboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/join-community"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                        : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Join Community
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex justify-center items-center gap-4 text-gray-700">
              <NavLink
                to="/verified-agent-dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? " px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                    : "hidden px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200 md:block"
                }
              >
                <FiSettings size={20} />
              </NavLink>
              <NavLink
                to="/verified-agent-dashboard/notifications"
                className={({ isActive }) =>
                  isActive
                    ? " px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                    : "hidden px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200 md:block"
                }
              >
                <FiBell size={20} />
              </NavLink>
              <NavLink
                to="/verified-agent-dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                    : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
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

                  <nav className="flex flex-col pt-8">
                    <ul className="space-y-6 text-lg">
                      <li className="flex gap-2">
                        <Icon type="home" />
                        <NavLink
                          to="/verified-agent-dashboard/home"
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
                          to="/verified-agent-dashboard/reports"
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary_green font-normal"
                              : "font-thin hover:text-primary_green transition duration-300"
                          }
                        >
                          Reports
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <Icon type="cup" />
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
                        <FiUsers
                          size={24}
                          className="text-gray-600 text-primary_green text-lg"
                        />
                        <NavLink
                          to="/verified-agent-dashboard/join-community"
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
                          to="/verified-agent-dashboard/notifications"
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
                          to="/verified-agent-dashboard/settings"
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
                    to="/login"
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
      </Header> */}
      <Typography
        variant={TypographyVariant.SUBTITLE}
        className="text-xl font-semibold items-center px-4 mt-8"
      >
        Settings
      </Typography>

      {/* User Info */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center">
          <div className="bg-[#F0FEFB] text-[#007A61] rounded-full w-16 h-16 flex items-center justify-center">
            BA
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-4">Blessing Asuquo</h2>
      </div>

      {/* Sections */}
      <div className="flex flex-col p-4 space-y-4 mt-4">
        {/* Personal Information */}
        <h3 className="font-normal text-gray-500">Personal information</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/basic-information")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="basicInfo" className="w-fit" />
                <span>Basic information</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate(
                  "/verified-agent-dashboard/settings/contact-information"
                )
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="contactInfo" className="w-fit" />
                <span>Contact information </span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <h3 className="font-normal text-gray-500">Account settings</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/password-reset")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="passwordReset" className="w-fit" />
                <span>Password reset</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/kyc-verification")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="kycVerify" className="w-fit" />
                <span>Kyc verification</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
          </div>
        </div>

        {/* Community */}
        <h3 className="font-normal text-gray-500">Community</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/join-community")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="joinCom" className="w-fit" />
                <span className="">Join community</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <h3 className="font-normal text-gray-500">Help & support</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/help-and-support/faq")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="faq" className="w-fit" />
                <span>FAQs</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/help-and-support/contact-us")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="contactUs" className="w-fit" />
                <span>Contact us</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
            <button
              className="cursor-pointer flex justify-between items-center p-2  rounded hover:bg-gray-100"
              onClick={() =>
                navigate("/verified-agent-dashboard/settings/help-and-support")
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="chatUs" className="w-fit" />
                <span>Chat with us</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-8 mb-12">
        <CiLogout size={24} className="text-error" />
        <NavLink
          to="/login"
          className="text-error font-semibold"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SettingsMobile;
