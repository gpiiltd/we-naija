import React from 'react'
import VerificationCard from '../../Components/Home/VerificationCard'
import HomeGoToReportCard from '../../Components/Home/GoToReportCard'
import InstitutionsCard from '../../Components/Home/Institution_card'
import Icon from '../../Assets/SvgImagesAndIcons'
import backgroundImage from '../../Assets/svgImages/reportCardBg.svg';
import backgroundImageGreen from '../../Assets/svgImages/background_bg_green.svg';
import bigGirlSvg from "../../Assets/svgImages/bgGirl.svg";
import KycNumberOfReportsCard from '../../Components/Home/KycNumberOfReportsCard'
import { useNavigate } from 'react-router-dom'

const PendingKyc = () => {
  const navigate = useNavigate();

  const handleOnTap = () => {
    navigate("/verified-agent-dashboard/reports/community-tasks/NCD-prevention/report-form");
}

  return (
    
    <div className='h-full pb-[1.5px]'>
        <p className="font-normal text-[#5E5959] text-lg">
          Hello, <span className="font-bold text-black">Blessing</span> 👋
        </p>
        <p className="font-light text-[#5E5959] text-sm">
        Let’s improve health care service together.
        </p>
          <div className="w-full sm:grid sm:grid-cols-1 md:flex lg:flex items-start lg:w-full mt-4 mb-10"> {/* first content that consist of two boxes */}
          <VerificationCard
          isUserVerified={false}
            statusMessage="Your ID & profile details are being verified"
            progressPercentage={90}
            responseTimeMessage="You would receive a response in less than 12 hours"
          />
          <br />
          <HomeGoToReportCard backgroundImage={backgroundImageGreen} />
          <KycNumberOfReportsCard isUserVerified={true} isUserStarPoints={true}/>
          <KycNumberOfReportsCard isUserVerified={true}/>
          
          </div>
          <p className="font-bold text-black">
           Recommended institutes
          </p>
          <p className="font-light text-[#5E5959] text-sm">
          Below are list of recommend institute to visit and give a report based on your residential address.
          <button onClick={handleOnTap}><p className='font-bold text-sm text-[#007A61] pr-1'>Give report</p></button>
          </p>
          <InstitutionsCard 
            statusMessage="No 5, Lekki view, Lagos Island, Lagos state, Nigeria."
            responseTimeMessage="You would receive a response in less than 12 hours"
            onClick={() => navigate("/verified-agent-dashboard/home/hospital-details")}

          />
          <div className="w-full flex justify-center mt-16 mb-[65px] lg:mb-20 ">
          <div className="relative h-[250px] w-full md:w-[50vw]">
         
           <div className="absolute inset-0 bg-[#007A61] rounded-lg py-12 px-4" 
           style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          }}
           >

   
           
           
            

            <p className="font-bold text-white text-base lg:text-2xl md:text-xl">
              Be the Change. Connect with<br />Fellow Health Champions.
            </p>
            <button className="bg-[#ED7D31] py-[16px] px-6 rounded-lg mt-6 text-white text-base font-bold flex items-center">Join community <Icon type="whiteArrowSvg" className="pl-3" /></button>
            </div>
           {/* Another overlay element */}
           <div
             className="absolute -bottom-[8rem] lg:-bottom-[9rem] right-0 lg:right-4 bg-transparent w-[343px] h-[365px] md:right-0 lg:w-[389.79px] lg:h-[393px]"
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
