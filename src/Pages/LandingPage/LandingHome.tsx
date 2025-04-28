import { Button } from "@gpiiltd/gpi-ui-library";
import LandingBg from "../../Assets/svgImages/landing-bg.svg";
import Icon from "../../Assets/SvgImagesAndIcons";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import InfoSection from "../../Components/Landing/AboutCards";
import bigGirlSvg from "../../Assets/svgImages/bgGirl.svg";
import backgroundImage from "../../Assets/svgImages/reportCardBg.svg";
import Leaderboard from "../../Components/Landing/Leaderboard";
import SwiperCarosel from "../../Components/Landing/SwiperCarosel";

const LandingHome = () => {
  return (
    <div>
      <div>
        <div className="relative w-full">
          {/* SVG Background */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${LandingBg})`,
              zIndex: 0,
            }}
          ></div>

          {/* Content Layered Above */}
          <div className="relative z-10 mt-24">
            <div className="lg:max-w-7xl mx-auto lg:flex lg:flex-row lg:items-center lg:justify-between lg:mt-40 mb-20">
              {/* larger screen - Heading */}
              <div className="hidden lg:block md:block flex-col lg:basis-1/2 lg:px-16 px-8">
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="max-w-lg mx-auto  mb-6 md:text-[56px] font-bold leading-tight"
                >
                  VOICE YOUR {` `}
                  <span className="inline-block relative">
                    CHANGE{" "}
                    <Icon
                      type="homeSVg"
                      className="ax-w-lg h-25 hidden lg:block absolute -right-[90px] -bottom-3 xl:-mt-2"
                    />
                  </span>
                </Typography>
                {/* Mobile icon */}
                <div className="lg:hidden mt-4 flex justify-center">
                  <Icon type="homeSVg" className="h-40 w-40" />
                </div>
              </div>

              {/* mobile screen - Heading */}
              <div className="flex flex-row items-center px-8 lg:basis-1/2 lg:hidden">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <Typography
                    variant={TypographyVariant.TITLE}
                    className="text-[30px] font-bold text-gray-800 mb-1 leading-9 lg:text[176px]"
                  >
                    VOICE YOUR CHANGE{" "}
                    <span className="hidden md:inline lg:inline">
                      <Icon type="homeSVg" className="" />
                    </span>
                  </Typography>
                </div>
                <Icon type="homeSVg" className="lg:hidden md:hidden h-40 w-40" />
              </div>

              {/* Right side - Text + Buttons */}
              <div className="lg:basis-1/2 px-8 mt-2 lg:mt-0">
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-normal text-base md:text-lg text-[#575757] mb-4 leading-9"
                >
                  Your voice matters! Share your experiences and insights to help drive real
                  improvements in healthcare. Make your impact— voice your change today!
                </Typography>

                <div className="max-w-lg mt-5  flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                  <Button
                    text="Send message"
                    active={true}
                    bg_color="#007A61"
                    text_color="white"
                    loading={false}
                    onClick={() => {}}
                  />
                  <Button
                    text="Join community"
                    active={true}
                    bg_color="#ED7D31"
                    text_color="white"
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* <div className="lg:flex flex-row lg:mt-10">
              <div className="flex flex-row items-center px-8 lg:basis-1/2 lg:mx-10">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <Typography
                    variant={TypographyVariant.TITLE}
                    className="text-[30px] font-bold text-gray-800 mb-1 leading-9 lg:text[176px]"
                  >
                    VOICE YOUR CHANGE{" "}
                    <span className="hidden md:inline lg:inline">
                      <Icon type="homeSVg" className="" />
                    </span>
                  </Typography>
                </div>
                <Icon
                  type="homeSVg"
                  className="lg:hidden md:hidden h-40 w-40"
                />
              </div>
              <div className="lg:basis-1/2">
                <div className="px-8">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="font-normal text-lg text-[#575757] mb-2 leading-9"
                  >
                    Your voice matters! Share your experiences and insights to
                    help drive real improvements in healthcare. Make your
                    impact— voice your change today!
                  </Typography>
                </div>
                <div className="w-full mt-8 flex flex-row space-x-2 px-8">
                  <Button
                    text="Send message"
                    // active={isValid && dirty}
                    active={true}
                    bg_color="#007A61"
                    text_color="white"
                    loading={false}
                    onClick={() => {}}
                  />
                  <Button
                    text="Join community"
                    // active={isValid && dirty}
                    active={true}
                    bg_color="#ED7D31"
                    text_color="white"
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div> */}
            {/* <div className="w-full h-[30rem] bg-cyan-200 mt-4 mb-4">
              <SwiperCarosel />
            </div> */}
            <SwiperCarosel />
            <div className="flex flex-row mr-6 items-center justify-center mt-6 mb-10 px-8">
              <div>
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="text-sm font-normal text-gray-800 mb-1 pr-3"
                >
                  Initiative of
                </Typography>
              </div>
              <Icon type="homeLandingNssf" />
            </div>
          </div>
        </div>
      </div>
      {/* About us */}
      <div className="bg-[#006C55] px-8 py-12 w-full flex flex-col md:flex-row-reverse items-center md:items-start gap-12 max-w-10xl mx-auto">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-2xl font-bold text-white mb-6"
          >
            ABOUT US
          </Typography>
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-[16px] font-light text-white mb-1 leading-7 max-w-lg"
          >
            WeNaija is an initiative of NSSF launched in 2021 to enable creatives engage in health
            advocacy. Using art forms such as photography, literature, and video storytelling, we
            have engaged over young Nigerians in health advocacy.
            <br />
            <br />
            Building on the success of the WeNaija campaign, NSSF launched the WeNaija community to
            leverage the power, passion, and creativity of Nigerian youths to transform our
            healthcare system.
            <br />
            <br />
            Through our community, we are empowering Nigerian youth to use the tools at their
            disposal to advocate for a healthier future.
          </Typography>
          <div className="w-[10rem] mt-6">
            <Button
              text="Sign up"
              active={true}
              border_color="#ffffff"
              text_color="white"
              loading={false}
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 w-full">
          <Icon type="millionpic" className="w-full h-auto max-h-[500px] object-contain" />
        </div>
      </div>
      {/* About us */}

      <div className="bg-[#001611] p-6 w-full">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl text-center leading-normal font-bold text-white mb-6"
        >
          BECOME A HEALTH CHAMPION
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-base text-center leading-10 font-light text-white mb-6 md:max-w-4xl mx-auto"
        >
          Join a vibrant community of health advocates! As a Health Champion, you’ll take on
          exciting challenges, earn rewards, and make a lasting impact.{" "}
          <span className="text-base text-justify font-bold">Here’s how it works:</span>
        </Typography>
        <div className="mb-8">
          <InfoSection />
        </div>
      </div>
      <Leaderboard />
      {/* Second Row - Full Width on All Screens */}
      <CommunitySection />
    </div>
  );
};

export default LandingHome;

const CommunitySection = () => {
  return (
    <div className="w-full flex justify-center p-6 mt-16 mb-[30px] lg:mb-10">
      <div className="relative flex flex-col lg:flex-row items-center w-full md:w-[80vw]">
        {/* Text + Button Section */}
        <div
          className="bg-[#007A61] h-[30rem] lg:h-[25rem] rounded-lg py-12 px-4 flex flex-col items-center text-center lg:text-left lg:items-start w-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full lg:max-w-2xl lg:my-auto lg:ml-16">
            <Typography
              variant={TypographyVariant.TITLE}
              className="font-bold text-[18px] text-white lg:text-4xl md:mb-10 md:text-xl leading-8"
            >
              Be the Change. Connect with
              <br />
              Fellow Health Champions.
            </Typography>
            <div className="w-full flex flex-row lg:space-x-5 space-x-2 mt-4">
              <Button
                text="Sign up"
                // active={isValid && dirty}
                active={true}
                bg_color="white"
                border_color="#ffffff"
                text_color="#007A61"
                loading={false}
                onClick={() => {}}
              />
              <Button
                text="Join community"
                // active={isValid && dirty}
                active={true}
                bg_color="#ED7D31"
                border_color="#ED7D31"
                text_color="white"
                loading={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute bottom-[-5rem] w-full lg:w-1/2 lg:justify-end lg:mt-0 lg:bottom-[-6rem] lg:-right-20">
          <div
            className="w-[302px] h-[360px] lg:w-[429.79px] lg:h-[493px]"
            style={{
              backgroundImage: `url(${bigGirlSvg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </div>
  );
};
