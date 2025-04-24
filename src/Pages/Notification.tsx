import React, { useState } from "react";
import Icon from "../Assets/SvgImagesAndIcons";
import { notifications } from "../utils/selectOptions";

const Notification: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true;
    if (activeTab === "Read") return notification.read;
    if (activeTab === "Unread") return !notification.read;
    return true;
  });

  return (
    <div className="p-6 bg-white  w-full md:w-[70%] mx-auto min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="flex  bg-[#F2F4F7] space-x-4 mb-6 w-full md:w-[60%] lg:w-[40%] rounded-xl p-4">
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
      <div className="space-y-4  rounded-3xl shadow-md">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 border-b space-x-4 ${
                notification.read ? "" : "bg-white"
              }`}
            >
              <div className="flex justify-between w-full">
                <div className="flex items-start">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      notification.read ? "bg-gray-400" : "bg-green-500"
                    } mr-2`}
                  />
                  <div className="flex flex-col">
                    <section className="flex justify-start ">
                      <Icon type="championIcon" className="pr-2 w-10 h-10" />
                      <div className="">
                        <p className=" text-black text-sm">{notification.user}</p>
                        <p className="text-gray-500 text-sm">{notification.handle}</p>
                      </div>
                    </section>
                    <p className="text-gray-700 text-sm md:text-base">{notification.message}</p>
                  </div>
                </div>

                <span className="text-gray-500 text-sm justify-self-end ">{notification.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No notifications available.</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
