import React from "react";
import { FooterProps } from "../types";

const Footer: React.FC<FooterProps> = ({ children, bg_color,className }) => {
  return (
    <footer
      className={`bg-${bg_color} text-white py-4 bottom-0 absolute w-full_width ${className}`}
      style={{
        backgroundColor: bg_color,
      }}
    >

        <div>{children}</div>
    </footer>
  );
};

export default Footer;
