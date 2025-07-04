import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import image1 from "../../Assets/svgImages/slide1.svg";
import image2 from "../../Assets/svgImages/slide2.svg";
import image3 from "../../Assets/svgImages/slide3.svg";
import image4 from "../../Assets/svgImages/slide4.svg";
import image5 from "../../Assets/svgImages/slide5.svg";
import image6 from "../../Assets/svgImages/carosel5.svg";

const imageList = [image1, image2, image3, image4, image5, image6];

const SwiperCarosel = () => {
  return (
    <div className="relative w-full  bg-slate-100 my-10">
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 5 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-full"
      >
        {imageList.map((imgSrc, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center h-40 sm:h-52 md:h-60"
          >
            <img
              alt={`Slide ${index + 1}`}
              src={imgSrc}
              className="w-full h-[15rem] mx-auto lg:h-[20rem] object-cover rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Swiper
        spaceBetween={10}
        slidesPerView={2} // Mobile-first
        breakpoints={{
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 6 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        className="w-full"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center h-40 sm:h-52 md:h-60"
          >
            <img
              alt=""
              src={`https://picsum.photos/seed/picsum${index}/300`}
              className="w-full h-[15rem] mx-auto lg:h-[20rem] object-cover rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <div className="absolute top-0 z-50 w-full h-[100px] bg-transparent overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="transparent "
            d="M0,0L1440,0C1440,0,1300,160,720,160C140,160,0,0,0,0Z"
          ></path>
        </svg>
      </div>
      <div className="relative w-full overflow-hidden transform rotate-180">
        {/* White top section */}
        <div className="relative bg-white  w-full"></div>

        {/* Gray SVG dip */}
        <svg
          className="absolute top-0 left-0 w-full h-[60px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#cccccc" // You can change this to any shade of gray
            d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SwiperCarosel;
