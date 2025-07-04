import Footer from "../../Components/Footer";
import { NavLink } from "react-router-dom";
import Icon from "../../Assets/SvgImagesAndIcons";
import { TypographyVariant } from "../../Components/types";
import Header from "../../Components/Header";
import { FiSettings, FiBell, FiX, FiUsers, FiMenu } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Typography from "../../Components/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetNotifications } from "../../redux/Services/settings/settingsServices";
import { AppDispatch, RootState } from "../../redux/Store/store";

const VADashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: notifications } = useSelector(
    (state: RootState) => state.settings.notificationsData,
  );

  useEffect(() => {
    dispatch(triggerGetNotifications({}));
  }, [dispatch]);

  const hasUnreadNotifications = Array.isArray(notifications)
    ? notifications.some((notification: any) => !notification.read_at) &&
      notifications.length > 0
    : false;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="min-h-screen flex flex-col w-full mt-8">
      <Header className="px-4 md:px-6 lg:px-16 pb-4">
        <div className="flex flex-row gap-4 md:gap-12 w-full items-center justify-between">
          <button onClick={toggleDrawer} className="md:hidden text-gray-700">
            <FiMenu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <div onClick={() => navigate("/verified-agent-dashboard/home")}>
              <Icon type="logo" className="w-fit cursor-pointer" />
            </div>

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
                to={
                  isDrawerOpen
                    ? "/verified-agent-dashboard/leaderboard"
                    : "/verified-agent-dashboard/settings"
                }
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
                <div className="relative">
                  <FiBell size={20} />
                  {hasUnreadNotifications && (
                    <span className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              </NavLink>
              {/* <NavLink
                to="/verified-agent-dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-2 text-primary_green bg-effect_green font-normal rounded-md"
                    : "px-2 py-2 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                }
              >
                <Icon type="avatar" />
              </NavLink> */}
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
                        <FiUsers size={24} className="text-gray-600 text-lg" />
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
                        <div className="relative">
                          <FiBell size={20} />
                          {hasUnreadNotifications && (
                            <span className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </div>
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
                          className="text-primary_green text-lg"
                        />
                        <NavLink
                          to="/verified-agent-dashboard/settings/setting-mobile"
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
                        : "text-error font-thin hover:text-error transition duration-300"
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

      <main className="flex-grow px-4 md:px-6  lg:px-16 pt-8">
        <Outlet />
      </main>
      <Footer bg_color="black" className="px-8 md:px-6  lg:px-16 py-20 md:py-0">
        <div className="border-b border-gray-800 md:mb-8 pb-4">
          <div className="flex flex-col gap-4  md:flex-row md:justify-between">
            <Icon
              type="wenaija"
              className="w-fit cursor-pointer"
              click={() => (window.location.href = "/verified-agent-dashboard")}
            />
            <div className="text-cream  ">
              <ul className="flex md:space-x-6">
                <li className="cursor-pointer">
                  <a
                    href="https://ng.linkedin.com/company/nssf-ng"
                    target="_blank"
                  >
                    <Icon type="linkedin" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="https://www.facebook.com/NSSF.NG" target="_blank">
                    <Icon type="facebook" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="https://x.com/nssf_ng" target="_blank">
                    <Icon type="twitter" />
                  </a>
                </li>
                <li className="cursor-pointer">
                  <a href="https://www.instagram.com/nssf_ng" target="_blank">
                    <Icon type="instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <nav className="text-cream text-xs py-4 ">
            <ul className="flex flex-col gap-4 md:flex-row">
              <li>
                <NavLink
                  to="/verified-agent-dashboard/home"
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
                  to="/verified-agent-dashboard/reports"
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
                  to="/verified-agent-dashboard/leaderboard"
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
                  to="/verified-agent-dashboard/join-community"
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
                  to="/verified-agent-dashboard/settings/basic-information"
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
            © 2025 Wenailja. All rights reserved.
          </Typography>
          {/* <ul className="flex space-x-3">
            <li className="cursor-pointer">Terms</li>
            <li className="cursor-pointer">Privacy </li>
            <li className="cursor-pointer">Cookies </li>
          </ul> */}
        </div>
      </Footer>
    </div>
  );
};

export default VADashboard;
