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