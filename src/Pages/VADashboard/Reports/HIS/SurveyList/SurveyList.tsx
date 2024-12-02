import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from '../../../../../Components/Typography';
import { TypographyVariant } from '../../../../../Components/types';
import { useNavigate } from "react-router-dom";
import Icon from '../../../../../Assets/SvgImagesAndIcons';


const SurveyList = () => {
    const navigate = useNavigate();

  return (
    <div className='bg-[#FFFFFF] shadow-b'>
        <section >
        <div className="flex gap-3 items-center">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>
        <Icon type="homeAvatar" className="pr-2" />

        <Typography variant={TypographyVariant.SUBTITLE} className='font-bold'>
        Quotient Specialist Hospital (QSH)        </Typography>
      </div>
        </section>
    </div>
  )
}

export default SurveyList