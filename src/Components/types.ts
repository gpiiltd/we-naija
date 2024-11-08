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

  export interface FooterProps {
    children: ReactNode;
    bg_color?: string;
    fullWidth?: string;
    logo?:any
    className?: string;
  }
  export interface ButtonProps {
    bg_color?: string;
    text?: string;
    onClick?: () => void;
    active?: boolean;
    loading?: boolean;
    text_color?: string;
    border_color?: string;
  }
  export interface CardProps {
    titleLeft: React.ReactNode;
    titleRight: React.ReactNode;
    children: React.ReactNode;
    width?: string;
    height?: string;
  }
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    closeIcon?: string;
  }
  export interface ICustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
  }