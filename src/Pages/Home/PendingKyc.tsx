import React from 'react'
import VerificationCard from '../../Components/Home/VerificationCard'
import HomeGoToReportCard from '../../Components/Home/GoToReportCard'
import InstitutionsCard from '../../Components/Home/Institution_card'
import Icon from '../../Assets/SvgImagesAndIcons'
import backgroundImage from '../../Assets/svgImages/reportCardBg.svg';
import bigGirlSvg from "../../Assets/svgImages/bgGirl.svg";
import {useNavigate } from "react-router-dom";


const PendingKyc = () => {
  const navigate = useNavigate();

  return (
    <div>
        <p className="font-normal text-[#5E5959] text-lg">
          Hello, <span className="font-bold text-black">Blessing</span> 👋
        </p>
        <p className="font-light text-[#5E5959] text-sm">
        Let’s improve health care service together.
        </p>
          <div className="w-full sm:grid sm:grid-cols-1 md:flex lg:flex items-start lg:w-[55rem] mt-4 mb-10"> {/* first content that consist of two boxes */}
          <VerificationCard
            statusMessage="Your ID & profile details are being verified"
            progressPercentage={90}
            responseTimeMessage="You would receive a response in less than 12 hours"
          />
          <br />
          <HomeGoToReportCard backgroundImage={backgroundImage} />
          </div>
          <p className="font-bold text-black">
           Recommended institutes
          </p>
          <p className="font-light text-[#5E5959] text-sm">
          Below are list of recommend institute to visit and give a report based on your residential address.
          </p>
          <InstitutionsCard 
            statusMessage="No 5, Lekki view, Lagos Island, Lagos state, Nigeria."
            responseTimeMessage="You would receive a response in less than 12 hours"
            onClick={() => navigate('hospital-details')}
            
          />
          <div className="w-full flex justify-center mt-16">
          <div className="relative h-[230px] w-[50vw] ">
           <div className="absolute inset-0 bg-slate-300 rounded-lg">
           <img src={backgroundImage} alt="" className="h-[230px] w-[50vw] rounded-lg"/>
            <p className="font-bold text-white text-2xl">
              Be the Change. Connect with<br />Fellow Health Champions.
            </p>
            <button className="bg-[#ED7D31] py-[16px] px-6 rounded-lg mt-6 text-white text-base font-bold flex items-center">Join community <Icon type="whiteArrowSvg" className="pl-3" /></button>
            </div>
           {/* Another overlay element */}
           <div
             className="absolute -bottom-[10rem] right-4 bg-transparent w-[389.79px] h-[393px]"
             style={{
               backgroundImage: `url(${bigGirlSvg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat', // Prevents the image from repeating
             }}
           />


          </div>
          </div>

    </div>
  )
}

export default PendingKyc
