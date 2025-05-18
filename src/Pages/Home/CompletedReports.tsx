import React, { useEffect, useState } from "react";
import ReportCards from "../../Components/Home/ReportCards";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store/store";
import { triggerGetAllCompletedTaskData } from "../../redux/Services/leaderboard/LeaderboardService";
import { triggerGetAllCompletedSurveyData } from "../../redux/Services/leaderboard/LeaderboardService";
import { ClipLoader } from "react-spinners";
import Icon from "../../Assets/SvgImagesAndIcons";

const CompletedReports = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [allSurveys, setAllSurveys] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"tasks" | "surveys">("tasks");

  const { completedTaskData, completedSurveyData } = useSelector(
    (state: RootState) => state.leaderboard,
  );

  const payload = {
    page: currentPage,
  };

  useEffect(() => {
    if (currentPage === 1) {
      setAllTasks([]);
      setAllSurveys([]);
    }
    dispatch(triggerGetAllCompletedTaskData(payload));
    dispatch(triggerGetAllCompletedSurveyData(payload));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (
      completedTaskData.statusCode === 200 &&
      completedTaskData.data?.results
    ) {
      const results = Array.isArray(completedTaskData.data.results)
        ? completedTaskData.data.results
        : [];

      if (currentPage === 1) {
        setAllTasks(results);
      } else {
        // Filter out any potential duplicates based on full_name
        setAllTasks((prevData) => {
          const existingNames = new Set(prevData.map((item) => item.task_name));
          const newResults = results.filter(
            (item: any) => !existingNames.has(item.task_name),
          );
          return [...prevData, ...newResults];
        });
      }
      setIsLoadingMore(false);
    }

    if (completedTaskData.error) {
      setIsLoadingMore(false);
    }
  }, [completedTaskData, currentPage]);

  useEffect(() => {
    if (
      completedSurveyData.statusCode === 200 &&
      completedSurveyData.data?.results
    ) {
      const results = Array.isArray(completedSurveyData.data.results)
        ? completedSurveyData.data.results
        : [];

      if (currentPage === 1) {
        setAllSurveys(results);
      } else {
        setAllSurveys((prevData) => {
          const existingNames = new Set(
            prevData.map((item) => item.indicator_name),
          );
          const newResults = results.filter(
            (item: any) => !existingNames.has(item.indicator_name),
          );
          return [...prevData, ...newResults];
        });
      }
      setIsLoadingMore(false);
    }

    if (completedSurveyData.error) {
      setIsLoadingMore(false);
    }
  }, [completedSurveyData, currentPage]);

  const handleShowMore = () => {
    if (activeTab === "tasks") {
      if (completedTaskData.data?.next && !isLoadingMore) {
        setIsLoadingMore(true);
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      if (completedSurveyData.data?.next && !isLoadingMore) {
        setIsLoadingMore(true);
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  if (completedTaskData.loading && completedSurveyData.loading) {
    return (
      <div className="flex justify-center items-center w-full h-full p-6 bg-white rounded-lg mx-auto mb-12">
        <ClipLoader color="#007A61" size={24} className="mr-6" />
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white mb-14">
      <div className="w-full sm:grid sm:grid-cols-1 md:flex lg:flex items-start gap-4 mt-4 mb-10">
        <>
          <ReportCards
            icon="calendarg"
            title="No. reports completed"
            number={allTasks.length + allSurveys.length}
          />
          <ReportCards
            icon="redcalender"
            title="Community task"
            number={allTasks.length}
          />
          <ReportCards
            icon="blucalender"
            title="Health institute survey"
            number={allSurveys.length}
          />
        </>
      </div>

      <div className="flex justify-center bg-[#F2F4F7] space-x-4 mb-6 w-full md:w-[50%] lg:w-[40%] mx-auto rounded-xl p-2">
        <button
          className={`px-6 py-4 rounded-t-lg font-medium ${activeTab === "tasks" ? "bg-white text-gray-800" : "text-gray-600"}`}
          onClick={() => setActiveTab("tasks")}
        >
          Community task ({allTasks.length})
        </button>
        <button
          className={`px-6 py-4 rounded-t-lg font-medium ml-2 ${activeTab === "surveys" ? "bg-white text-gray-800" : "text-gray-600"}`}
          onClick={() => setActiveTab("surveys")}
        >
          Health inst. survey ({allSurveys.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
        {(activeTab === "tasks" ? allTasks : allSurveys).length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No data available
          </div>
        ) : (
          (activeTab === "tasks" ? allTasks : allSurveys).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-6 border-b last:border-b-0"
            >
              <div className="flex items-center gap-6">
                <Icon type="tick" className="w-6 h-6" />
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {activeTab === "tasks"
                      ? item.task_name
                      : item.institution_name}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Icon type="document" className="w-4 h-4" />
                      {activeTab === "tasks"
                        ? `Task ${idx + 1}`
                        : `${item.indicator_name}`}
                    </span>
                    <span> | </span>
                    <span>
                      {item.created_at
                        ? new Date(item.created_at)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                        : "--"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-orange-500 font-semibold">
                <Icon type="starIcon" className="w-6 h-6" />
                <span className="text-sm font-semibold text-[#ED7D31]">
                  {item.sp || 5} SP
                </span>
              </div>
            </div>
          ))
        )}

        {/* Show More Button */}
        {(activeTab === "tasks"
          ? completedTaskData.data?.next
          : completedSurveyData.data?.next) && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              disabled={isLoadingMore}
              className={`text-black hover:underline text-2xl font-semibold ${
                isLoadingMore ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Show more"
            >
              {isLoadingMore ? (
                <div className="flex items-center justify-center">
                  <ClipLoader color="#007A61" size={20} className="mr-2" />
                  Loading...
                </div>
              ) : (
                "Show more"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedReports;
