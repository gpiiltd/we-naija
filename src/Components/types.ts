import { ReactNode } from "react";

export enum TypographyVariant {
    TITLE,
    SUBTITLE,
    NORMAL,
    BOLD,
    SMALL,
  }
  
  export interface TypographyProps {
    children: React.ReactNode;
    variant: TypographyVariant;
    className?: string;
  }

  export interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    helperText?: string;
    placeHolder?: string;
    icon?: ReactNode;
    onClick?: () => void;
    focusStyle?: string;
  }