import { FC, ReactNode } from "react";
import Icon from "../assets/SvgImagesAndIcons";
import { TypographyVariant } from "./types";
import Typography from "./Typography";

interface AuthProps {
  children: ReactNode;
}
const AuthPages: FC<AuthProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col h-screen  md:flex-row">
      <div className='pt-12 flex flex-col gap-8 w-full md:bg-teal_green md:h-screen md:w-auto md:pt-24 md:gap-24'>
       <div className="md:m-4 flex items-center justify-center">
          <Icon type="logo" />
        </div>
      <div className="w-full flex flex-col justify-center items-center gap-6 ">
        <div className="flex flex-col justify-center items-center ">
          <Icon type="patients" />
          <div className='hidden md:block pt-6 w-[300px]'>
          <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-light_gray text-center"
            >
              Let's build a healthy community together
            </Typography>
          </div>
           
        </div>
      </div>
      </div>
      <div className="flex px-4 pt-5 md:px-0  md:w-3/5  md:pt-52 md:justify-center md:text-center">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-light_gray "
        >
          {children}
        </Typography>
      </div>
    </div>
  );
  
};

export default AuthPages;
