import React from "react";
import { Header } from "@gpiiltd/gpi-ui-library";
import Icon from "../../Assets/SvgImagesAndIcons";
import logo from "../../Assets/svgImages/logo.svg";

const HeaderComponent = () => {
  return (
    <div className="shadow-md p-4 lg:px-12">
      <Header
        logo={logo}
        children={
          <>
            <div className="flex gap-2 cursor-pointer">
              <Icon type="notification" className="w-10 h-10" />
              <Icon type="settings" className="w-10 h-10" />
              <Icon type="user" className="w-10 h-10" />
            </div>
          </>
        }
      />
    </div>
  );
};

export default HeaderComponent;
import React, { FC } from "react";
import { FooterProps } from "../types";

const Header: FC<FooterProps> = ({children, className}) => {
  return (
    <header className={`flex justify-between items-center shadow w-full z-20 bg-white ${className}`}>
      {children}
    </header>
  );
};

export default Header;
