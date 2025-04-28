import { FC, ReactNode } from "react";
import Icon from "../Assets/SvgImagesAndIcons";
import { TypographyVariant } from "./types";
import Typography from "./Typography";

interface AuthProps {
  children: ReactNode;
}
const AuthPages: FC<AuthProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <div className="pt-12 w-full flex flex-col gap-8 md:pb-8 md:bg-teal_green md:h-screen md:gap-12 lg:pt-18 lg:gap-24 lg:w-2/4 lg:pb-0">
        <div
          className="md:m-4 flex items-center justify-center cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Icon type="logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <Icon type="patients" />
            <div className="hidden md:block pt-6 w-[300px]">
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
      <div className="flex w-full px-4 pt-5 justify-center items-center md:px-32 lg:px-56">
        {children}
      </div>
    </div>
  );
};

export default AuthPages;
