import React from 'react';
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from 'react-router-dom';

interface HomeGoToReportCardProps {
    backgroundImage?: string;
}

const HomeGoToReportCard: React.FC<HomeGoToReportCardProps> = ({
  backgroundImage,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full border-[1px] border-solid border-[#D0D5DD] py-6 px-8 rounded-lg mr-4" 
    style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() =>
        navigate(
          `/verified-agent-dashboard/reports`
        )
      }
    >
      <section className="flex justify-between items-center">
        
        <p>Start giving reports to increase<br />your <span className="font-bold text-[#ED7D31]">Star Points.</span></p>
        <Icon type="home-report-star" className="pr-2" />
      </section>
      <button className="bg-[#007A61] py-3 w-full rounded-lg mt-5 text-white text-sm font-normal">Go to report</button>
    </div>
  );
};

export default HomeGoToReportCard;
