// src/Pages/Settings/FAQ.tsx
import React, { useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can change your plan at any time.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your subscription at any time without penalty.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer: "Yes, you can customize your invoices with additional information.",
    },
    {
      question: "How does billing work?",
      answer: "Billing is done monthly or annually, depending on your plan.",
    },
    {
      question: "How do I change my account email?",
      answer: "You can change your email in the account settings.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="md:max-w-[60%] mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
      <div className="flex">
        <span onClick={() => navigate("/verified-agent-dashboard/settings/setting-mobile")}>
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
            <div className=" text-gray-600 bg-gray-100 p-4 rounded-lg border-t-0">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
