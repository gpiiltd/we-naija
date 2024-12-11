import React from "react";
import backgroundImage from "../../Assets/svgImages/background.svg"; // Import the SVG file
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
    const navigate = useNavigate();

  return (
    <>  
    <div className="flex md:hidden">
        <span
          onClick={() =>
            navigate("/verified-agent-dashboard/settings/setting-mobile")
          }
        >
          <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
        </span>

        <h5 className="text-2xl font-semibold mb-4 md:text-center">
          Contact us
        </h5>
      </div>
    <div className="flex justify-center items-center mt-4 mb-8">
      <div
        className="relative w-full md:w-[60%] lg:w-[40%] h-[600px] rounded-xl flex flex-col  bg-[#007A61] "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <div className=" my-8 mx-6">
          <div className="w-full mx-auto p-6 0 text-white ">
            <h2 className="text-2xl font-bold mb-4">Reach Out to Us</h2>
            <p className="mb-4 w-[80%]">
              Feel free to reach out to us, be it in come visiting, or on our
              social media handle.
            </p>
            <div className="flex items-center my-10">
              <span className="material-icons">
                <Icon type="phone" />
              </span>
              <span className="ml-8 text-lg">+29000000000</span>
            </div>
            <div className="flex items-center my-10">
              <span className="material-icons">
                <Icon type="email" />
              </span>
              <span className="ml-8 text-lg">hello@mail.com</span>
            </div>
            <div className="flex items-center my-10">
              <span className="material-icons">
                <Icon type="location" />
              </span>
              <span className="ml-8 text-lg">33, New York City, United States.</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-white hover:text-gray-300">
                <Icon type="facebooko" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <Icon type="twittero" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <Icon type="instagramo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
