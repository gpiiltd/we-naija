import backgroundImage from "../../Assets/svgImages/background.svg";
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
          className="relative w-full md:w-[60%] lg:w-[60%] h-[600px] rounded-xl flex flex-col  bg-[#007A61] "
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
                <span className="ml-8 text-lg">+2348141226613</span>
              </div>
              <div className="flex items-center my-10">
                <span className="material-icons">
                  <Icon type="email" />
                </span>
                <span className="ml-8 text-lg">info@nssf.ng</span>
              </div>
              <div className="flex items-center my-10">
                <span className="material-icons">
                  <Icon type="location" />
                </span>
                <span className="ml-8 text-lg">
                  Lake Point Towers, Banana Island, Lagos, 106104, Nigeria.
                </span>
              </div>
              <div className="flex space-x-8">
                <a
                  href="https://www.facebook.com/NSSF.NG"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  <Icon type="facebooko" />
                </a>
                <a
                  href="https://x.com/nssf_ng"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  <Icon type="twittero" />
                </a>
                <a
                  href="https://www.instagram.com/nssf_ng"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  <Icon type="instagramo" />
                </a>
                <a
                  href="https://ng.linkedin.com/company/nssf-ng"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  <Icon type="linkedin2" className="w-12 h-12" />
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
