import { NavLink } from "react-router-dom";
import { TypographyVariant } from "../../Components/types";
import Header from "../../Components/Header";
import { Outlet } from "react-router-dom";
import Typography from "../../Components/Typography";
import { useDispatch } from "react-redux";
import { triggerLogout } from "../../redux/Services/user/UserServices";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AppDispatch } from "../../redux/Store/store";

const SettingsHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(triggerLogout());
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Typography
        variant={TypographyVariant.SUBTITLE}
        className="hidden md:block mb-4 font-bold"
      >
        Settings
      </Typography>
      <Header className="">
        <div className="flex flex-row gap-4 md:gap-12 w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <nav className="hidden md:block pt-2 pb-4">
              <ul className="flex justify-center items-center text-sm md:text-xs lg:text-base lg:gap-4">
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/basic-information"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Basic Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/contact-information"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Contact Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/password-reset"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Password Reset
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/kyc-verification"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    KYC Verification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/join-community"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Join Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/verified-agent-dashboard/settings/help-and-support"
                    className={({ isActive }) =>
                      isActive
                        ? "px-2 py-4 text-primary_green  font-normal  border-b-4 border-primary_green"
                        : "px-2 py-4 font-thin hover:rounded-md hover:text-primary_green hover:bg-effect_green hover:font-normal transition duration-200"
                    }
                  >
                    Help and Support
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div
            onClick={handleLogout}
            className="flex gap-2 justify-center mt-8 mb-12 cursor-pointer text-error"
          >
            <CiLogout size={24} className="text-error" />
            Logout
          </div>
        </div>
      </Header>
      <main className="flex-grow px-4 md:px-6  lg:px-16 pt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsHeader;
