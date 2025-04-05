import React from 'react';
import Icon from "../../Assets/SvgImagesAndIcons";
import ProgressBar from './ProgressBar';

// Define the props interface
interface VerificationCardProps {
  statusMessage: string;
  progressPercentage: number;
  responseTimeMessage: string;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  statusMessage,
  progressPercentage,
  responseTimeMessage,
}) => {
  return (
    <div className="w-full border-[1px] border-solid border-[#D0D5DD] py-6 px-8 rounded-lg mr-4">
      <section className="flex justify-start">
        <Icon type="home-kyc-verification" className="pr-2" />
        <p>KYC Verification Status</p>
      </section>
      <p className="font-bold text-[#007A61] text-sm pt-3">{statusMessage}</p>
      <p className="font-normal text-[#5E5959] text-sm">{responseTimeMessage}</p>
      <ProgressBar percentage={progressPercentage} />
    </div>
  );
};

export default VerificationCard;
