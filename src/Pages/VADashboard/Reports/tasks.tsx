import { useNavigate } from "react-router-dom";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";
import { handleBreadCrumbNavigate } from "../../../utils/handleBreadCrumb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { useEffect, useState } from "react";
import { triggerGetAllCommunityCategories } from "../../../redux/Services/community/communityServices";
import { toast } from "react-toastify";

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [communityTasks, setCommunityTasks] = useState<any[]>([]);
  const { communityCategories } = useSelector((state: RootState) => state.community);

  useEffect(() => {
    dispatch(triggerGetAllCommunityCategories({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (communityCategories?.statusCode === 200 && communityCategories) {
      console.log("community TASKSin UseEffect>>>", communityCategories.data);
      setCommunityTasks(communityCategories.data);
    }

    if (communityCategories?.error && communityCategories?.message) {
      console.error("Error fetching community tasks:", communityCategories.message);
        toast.error(communityCategories.message);
    }
  }, [
    communityCategories?.statusCode,
    communityCategories?.message,
    communityCategories?.error,
    communityCategories,
    dispatch,
  ]);

  console.log("community TASKS READY>>>", communityTasks);

  return (
    <>
      {" "}
      <Typography
        variant={TypographyVariant.SMALL}
        className="pt-1 text-light_gray max-w-lg"
      >
        Kindly select the community task category you would like to proceed
        with.
      </Typography>
      <div className="grid gap-6 py-3 pb-48 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {communityTasks.length > 0 &&
          communityTasks.map((task, index) => (
            <Card titleLeft={undefined} titleRight={undefined}>
              <div
                className={`${
                  index % 3 === 0
                    ? "bg-[#F5F4FE]"
                    : index % 3 === 1
                    ? "bg-[#FEF8F4]"
                    : "bg-[#F4FEF5]"
                } flex items-center justify-between py-12 px-6 gap-2 cursor-pointer`}
                onClick={() =>
                  handleBreadCrumbNavigate(
                    `/verified-agent-dashboard/reports/community-tasks/${task.name.replace(
                      /\s+/g,
                      ""
                    )}/${task.identifier}`,
                    task.name,
                    navigate
                  )
                }
              >
                <div>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="font-bold tracking-wide"
                  >
                    {task.name}
                  </Typography>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="pt-2 text-light_gray"
                  >
                    {task.description}
                  </Typography>
                </div>
                <IoIosArrowForward
                  className="font-extrabold"
                  size={34}
                  color="#007A61"
                />
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Tasks;
