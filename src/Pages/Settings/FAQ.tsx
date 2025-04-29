// src/Pages/Settings/FAQ.tsx
import React, { useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What are 'Community Tasks' and 'Primary Health Centre Tasks'?",
      answer:
        "Community Tasks are tasks that are assigned to the community to complete. Primary Health Centre Tasks are tasks that are assigned to the Primary Health Centre to complete.",
    },
    {
      question: "How do I complete a task?",
      answer:
        "Once you select a task, a set of questions will appear. Fill in the answers accurately based on your findings. After completing the questions, submit your responses to earn points.",
    },
    {
      question: "Can I save my answers and come back later?",
      answer:
        "Yes! If you are unable to finish at once, you can save your progress as a draft and return later to complete and submit it.",
    },
    {
      question: "How are points awarded?",
      answer:
        "Each completed tag has a point value attached to it, based on the complexity and importance of the task. Once you successfully submit a task and it has been completed, your points are automatically added to your account.",
    },
    {
      question: "Where can I see my points and how I rank against others?",
      answer:
        "You can view your accumulated points and your position on the leaderboard by clicking the 'Leaderboard' section on your dashboard.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="md:max-w-[60%] mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
      <div className="flex">
        <span
          onClick={() =>
            navigate("/verified-agent-dashboard/settings/setting-mobile")
          }
        >
          <Icon type="arrowBackSvg" className="mr-4 md:hidden" />
        </span>

        <h5 className="text-sm md:text-2xl font-semibold mb-4 md:text-center">
          Frequently Asked Questions
        </h5>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className=" rounded-lg  m-4">
          <div
            className={`flex justify-between items-center cursor-pointer p-4 rounded-lg border-b-0 ${
              activeIndex === index ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-lg font-normal">{faq.question}</span>
            <span className="text-xl">
              {activeIndex === index ? (
                <Icon click={() => toggleFAQ(index)} type="minusCircle" />
              ) : (
                <Icon click={() => toggleFAQ(index)} type="plusCircle" />
              )}
            </span>
          </div>
          {activeIndex === index && (
            <div className=" text-gray-600 bg-gray-100 p-4 rounded-lg border-t-0">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
