import React, { useState } from 'react'
import Icon from '../../Assets/SvgImagesAndIcons'
import SurveysCard from '../../Components/Home/SurveyCard'
import Dialog from '../../Components/Home/Dialog'
import { NavLink } from 'react-router-dom';
import { Typography } from '@gpiiltd/gpi-ui-library';
import { TypographyVariant } from '../../Components/types';
import Footer from '../../Components/Footer';


function HospitalDetail() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <>
      <div>
      <Dialog 
      isOpen={isDialogOpen} 
      onClose={closeDialog} 
      title="My Dialog" 
      className='absolute w-full bg-[#34405499]' 
      feedBackClassName='w-[373px] lg:w-[573px] flex items-center justify-center'>
        <p>This is a reusable dialog component!</p>
      </Dialog>
      <div className="w-full h-full overscroll-contain">
        <div className="w-full  items-start">
         <div className="flex ">
           <Icon type="arrowBackSvg" className="mr-8" />
           <div className="flex justify-start items-center">
            <Icon type="homeAvatar" className="pr-2 size-12" />
            <p className="font-bold text-lg">Quotient Specialist Hospital (QSH)</p>
            </div>
         </div>
         <div className="w-[70vw] pl-0 pr-4 lg:pl-16 lg:pr-48 md:pl-16 md:pr-48  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 pb-16 mt-4">
              {/* 1 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="locationGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">No 5, Lekki view, Lagos Island, Lagos state. Ngeria</p>
            </div>

            {/* 2 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="timeGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">Monday - Sunday (24 hours)</p>
            </div>

            {/* 3 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="callingGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">08105201636</p>
            </div>

            {/* 4 */}
            <div className="flex justify-start items-center pb-2">
            <Icon type="messageGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">Quotientspecialist@gmail.com</p>
            </div>

          </div>

          <p className="font-bold text-lg">Survey list (4)</p>
          <p className="font-normal text-sm text-[#5E5959] mt-2">Kindly select the survey indicator you would like to report<br />on this institution.</p>
          
        </div>

        <SurveysCard 
        responseTimeMessage="Acceptability of services" 
        statusMessage="Lorem ipsum dolor sit amet consectetur. Orci enim pulvinar pulvinar adipiscing." 
        progressPercentage={45} 
        onClick={openDialog}
        />

        {/* This is the last content */}
        <div className="w-full bg-slate-200 mt-16 flex px-5 lg:px-40 py-14 rounded-lg font-bold text-lg">
          <div className="w-full  flex flex-col justify-between items-center lg:flex-row">
            <p className='pb-5'>Have generic feedback or reports on this facility?</p>
            <div className="flex ">
              <button className="border-[1.5px] px-10 py-3 border-[#5E5959] rounded-lg text-black text-sm font-bold mr-5">Upload images</button>
              <button className="bg-[#007A61] px-10 py-3 rounded-lg  text-white text-sm font-normal">Write a report</button>
            </div>
          </div>

        </div>
        
       
        
        </div>
      </div>
    </>

  )
}

export default HospitalDetail
