import { Button, Typography } from '@gpiiltd/gpi-ui-library';
import React from 'react'
import { TypographyVariant } from '../types';
import Icon from '../../Assets/SvgImagesAndIcons';


interface DialogProps {
    isOpen: boolean;
    title: string;
    className: string;
    feedBackClassName: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    title,
    onClose,
    children,
    className,
    feedBackClassName,
}) => {

    if (!isOpen) return null;

    return (
        <div className={`dialog-backdrop  ${className || ''}`}>
          <div className="dialog-content">
            <header className="dialog-header">
              {/* <h2>{title}</h2>
              <button onClick={onClose} className="close-button" aria-label="Close dialog">
                ×
              </button> */}
            </header>
            <main className="flex items-center justify-center h-screen ">
              <div className={`p-10 flex flex-col bg-white rounded-lg ${feedBackClassName || ''}`}>
              <Icon type="infoIcon" className="size-20" />
              <Typography variant={TypographyVariant.NORMAL} className="pt-5 pb-2 text-[16px] lg:text-[20px] font-normal text-[#101828]">
              Are you sure you want to submit?
            </Typography>
            <Typography variant={TypographyVariant.SMALL} className="text-center text-[12px] lg:text-[14px] mb-5 text-[#5E5959] font-light">
            You're unable to access the survey due to pending KYC verification. You'll receive a notification once it's complete, and then you can start. For any issues, please contact support.
            </Typography>
            

            <Button
                border_color='bg-transparent'
                text="Yes, I’m sure"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={false}
                onClick={undefined}
                
              />

            <button className="w-full border-[1px] border-[#D0D5DD] rounded-lg mt-2 text-[#5E5959] text-sm font-normal items-center px-[5rem] py-[1rem] lg:px-[7rem] sm:px-[5rem] md:px-[5rem]" onClick={onClose}>Go back</button>

              </div>
            </main>
            
          </div>
        </div>
      );
}

export default Dialog