import React from "react";
import Header from "../../Components/Header";
import { FiSettings, FiBell, FiX, FiMenu } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import { NavLink } from "react-router-dom";

const KycHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <Header className="px-4 md:px-6 lg:px-16">
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
                      <FiBell
                        size={24}
                        className=" text-primary_green text-lg"
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
                        className=" text-primary_green text-lg"
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
                      : "text-error  font-thin hover:text-error transition duration-300"
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
  );
};

export default KycHeader;
