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
    value?: string;
    setValues?: (value:Record<string,string>) => void;
    setFieldValue?:(a:string, b:string)=> void
    setFieldTouched?:(a: string, b: boolean, c: boolean)=> void
  }

  export interface KycCardProps {
    title: string;
    description: string;
    icon: string;
    linkTo: string;
  }

  export interface Errors {
    address?: string;
    nationality?: string;
    gender?: string;
    dateOfBirth?: string;
    idType?: string;
    idNumber?: string;
    frontFile?: string;
    backFile?: string;
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
    icon?: any
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
  export interface SearchBarProps {
    placeholder?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    suggestions?: string[];
    value?:string
  }
