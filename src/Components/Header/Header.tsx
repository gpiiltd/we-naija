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
