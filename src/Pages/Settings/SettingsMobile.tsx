import { Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import { CiLogout } from "react-icons/ci";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { triggerLogout } from "../../redux/Services/user/UserServices";

const SettingsMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(triggerLogout() as any);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex flex-col w-full  bg-[#E3E3E359]">
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
                  "/verified-agent-dashboard/settings/contact-information",
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
                navigate(
                  "/verified-agent-dashboard/settings/help-and-support/faq",
                )
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
                navigate(
                  "/verified-agent-dashboard/settings/help-and-support/contact-us",
                )
              }
            >
              <div className="flex items-center gap-2">
                <Icon type="contactUs" className="w-fit" />
                <span>Contact us</span>
              </div>
              <Icon type="arrowRight" className="w-fit" />
            </button>
          </div>
        </div>
      </div>

      <div
        onClick={handleLogout}
        className="flex gap-2 justify-center mt-8 mb-12 cursor-pointer text-error"
      >
        <CiLogout size={24} className="text-error font-semibol" />
        Logout
      </div>
    </div>
  );
};

export default SettingsMobile;
