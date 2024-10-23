import React from "react";
import { TypographyProps, TypographyVariant } from "../types";

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
}) => {
  const classes = {
    [TypographyVariant.TITLE]: "text-3xl font-bold leading-tight",
    [TypographyVariant.SUBTITLE]: "text-2xl font-semibold leading-relaxed",
    [TypographyVariant.NORMAL]: "text-base font-normal leading-relaxed",
    [TypographyVariant.BOLD]: "text-base font-bold leading-relaxed",
    [TypographyVariant.SMALL]: "text-sm font-normal leading-tight",
  }[variant];

  return <div className={`${classes} ${className}`}>{children}</div>;
};

export default Typography;
