import React, { useState } from "react";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import JoinCommunity from "./JoinCommunity";

const HelpandSupport = () => {
  const [activeTab, setActiveTab] = useState<string>("faq");

  return (
    <div className="">
      <div className="flex justify-center bg-[#F2F4F7] space-x-4 mb-6 w-full md:w-[50%] lg:w-[40%] mx-auto rounded-xl p-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "faq" ? "bg-white text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "contact" ? "bg-white text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          Contact us
        </button>

        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "join" ? "bg-white text-gray-800" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("join")}
        >
          Chat with us
        </button>
      </div>

      {activeTab === "faq" && <FAQ />}
      {activeTab === "contact" && <ContactUs />}
      {activeTab === "chat" && <JoinCommunity />}
    </div>
  );
};

export default HelpandSupport;
