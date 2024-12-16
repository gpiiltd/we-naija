import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import Tasks from "./tasks";
import NCDPrevention from "./NCDPrevention";
import Breadcrumb from "./BreadCrum";

const CommunityTasks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div>
      <div className="flex gap-3 items-center pb-2">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>

        <Typography variant={TypographyVariant.SUBTITLE}>
        Community Task
        </Typography>
      </div>
      <Breadcrumb />
      {currentPath === "/verified-agent-dashboard/reports/community-tasks" && <Tasks />}
      {currentPath === "/verified-agent-dashboard/reports/NCD-prevention" && (
        <NCDPrevention />
      )}
    </div>
  );
};

export default CommunityTasks;
