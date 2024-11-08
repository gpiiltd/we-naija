import React from "react";
import { TypographyProps, TypographyVariant } from "../types";

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
}) => {
  const classes = {
    [TypographyVariant.TITLE]: "text-3xl tracking-wide leading-5 ",
    [TypographyVariant.SUBTITLE]: "text-2xl  ",
    [TypographyVariant.NORMAL]: "text-base  ",
    [TypographyVariant.BOLD]: "text-base ",
    [TypographyVariant.SMALL]: "text-sm  ",
  }[variant];

  return <div className={`${classes} ${className}`}>{children}</div>;
};

export default Typography;
