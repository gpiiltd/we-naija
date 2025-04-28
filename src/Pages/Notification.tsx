import React, { useState, useEffect } from "react";
// import Icon from "../Assets/SvgImagesAndIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store/store";
import {
  triggerGetNotifications,
  triggerReadNotifications,
} from "../redux/Services/settings/settingsServices";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

interface Notification {
  id: string;
  read_at: boolean;
  user: string;
  handle: string;
  message: string;
  sent_at: string;
  title: string;
}

const Notification: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const dispatch: AppDispatch = useDispatch();
  const {
    data: notifications,
    loading,
    error,
    message,
  } = useSelector((state: RootState) => state.settings.notificationsData);

  useEffect(() => {
    dispatch(triggerGetNotifications({}));
  }, [dispatch]);

  useEffect(() => {
    if (error && message) {
      toast.error(message);
    }
  }, [error, message]);

  const formatTimeAgo = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.log("error", error);
      return timestamp; // fallback to original timestamp if parsing fails
    }
  };

  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    if (isRead) return;

    try {
      const result = await dispatch(
        triggerReadNotifications({ notification_ids: [notificationId] })
      ).unwrap();

      if (result?.status_code === 200) {
        toast.success("Notification marked as read");

        dispatch(triggerGetNotifications({}));
      } else {
        toast.error(result?.message || "Failed to mark notification as read");
      }
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
      toast.error(error?.message || "An error occurred while marking the notification as read");
    }
  };

  console.log("notifications", notifications);
  const filteredNotifications = Array.isArray(notifications)
    ? notifications.filter((notification: Notification) => {
        if (activeTab === "All") return true;
        if (activeTab === "Read") return notification.read_at;
        if (activeTab === "Unread") return !notification.read_at;
        return true;
      })
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-full md:w-[70%] mx-auto min-h-screen mb-10">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="flex bg-[#F2F4F7] space-x-4 mb-6 w-full md:w-[60%] lg:w-[40%] rounded-xl p-4">
        <button
          className={`py-2 px-4 rounded-lg w-24 ${
            activeTab === "All" ? "bg-white text-gray-800" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("All")}
        >
          All
        </button>
        <button
          className={`py-2 px-4 rounded-lg w-24 ${
            activeTab === "Read" ? "bg-white text-gray-800" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Read")}
        >
          Read
        </button>
        <button
          className={`py-2 px-4 rounded-lg w-24 ${
            activeTab === "Unread" ? "bg-white text-gray-800" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Unread")}
        >
          Unread
        </button>
      </div>
      <div className="space-y-4 rounded-3xl shadow-md">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 border-b space-x-4 ${
                notification.read_at ? "cursor-default" : "cursor-pointer hover:bg-gray-50"
              }`}
              onClick={() => handleNotificationClick(notification.id, notification.read_at)}
            >
              <div className="flex justify-between w-full">
                <div className="flex items-start">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      notification.read_at ? "bg-gray-400" : "bg-green-500"
                    } mr-2`}
                  />
                  <div className="flex flex-col">
                    <section className="flex justify-start">
                      {/* <Icon type="championIcon" className="pr-2 w-10 h-10" /> */}
                      <div>
                        <p className="text-black text-sm">{notification.title}</p>
                        <p className="text-gray-500 text-sm">{notification.handle}</p>
                      </div>
                    </section>
                    <p className="text-gray-700 text-sm md:text-base">{notification.message}</p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm justify-self-end">
                  {formatTimeAgo(notification.sent_at)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-4 text-center">No notifications available.</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
