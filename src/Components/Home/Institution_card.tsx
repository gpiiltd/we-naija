import React from 'react';
import Icon from "../../Assets/SvgImagesAndIcons";


// Define the props interface
interface InstitutionsCardProps {
  statusMessage: string;
  responseTimeMessage: string;
  onClick?:()=>void;
}

const InstitutionsCard: React.FC<InstitutionsCardProps> = ({
  statusMessage,
  onClick
}) => {
  return (
    <div className="div " onClick={onClick}>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 '>
{[1, 2, 3, 4, 5, 6].map((map, i) => (
    <div className="border-[1px] border-solid border-[#D0D5DD] rounded-lg bg-white shadow-md p-2 mt-4 cursor-pointer">
    <div className="py-4 px-6 mr-4">
      <section className="flex justify-start ">
        <Icon type="homeAvatar" className="pr-2" />
        <div className="">
        <p className='font-bold text-black'>Quotient Specialist Hospital</p>
        <p className='font-normal text-[#5E5959]'>QSH</p>
        </div>
        
      </section>
      <p className="font-normal text-sm pt-3">{statusMessage}</p>
      <div className="flex items-center justify-start pt-2">
      <Icon type="timeClocKSvg" className="pr-2" />
      <p className='font-normal text-sm text-[#5E5959] pr-1'>Monday - Sunday</p>
      <p className='font-normal text-sm'>(24 hours)</p>
      </div>
    </div>

    <div className='h-[1.5px] w-full bg-[#E4E7EC]'></div>
    <div className="flex items-center justify-end pr-4 pt-2 mb-1">
      
      <p className='font-bold text-sm text-[#007A61] pr-1'>Give report</p>
      <Icon type="arrowUpSvg" className="pr-2" />
      </div>
    </div>
))}
    </div>
    <div className='flex justify-center w-full'>
    <button className="border-[1.5px] border-[#5E5959] rounded-lg mt-6 text-[#5E5959] text-sm font-bold items-center px-[5rem] py-[1rem] lg:px-[7rem] sm:px-[5rem] md:px-[5rem]">Show more</button>
    </div>
    </div>
  );
};

export default InstitutionsCard;
