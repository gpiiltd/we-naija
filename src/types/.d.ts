declare module "otp-input-react" {
  const OTPInput: any;
  const ResendOTP: any;
  export { OTPInput, ResendOTP };
  export default OTPInput;
}

declare module "react-radio-buttons" {
  import React from "react";

  export interface RadioGroupProps {
    children: React.ReactNode;
    onChange?: (value: string) => void;
    horizontal?: boolean;
  }

  export interface RadioButtonProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;

    iconSize?: number;
    iconInnerSize?: number;
    padding?: number;
    rootColor?: string;
    pointColor?: string;
  }

  export const RadioGroup: React.FC<RadioGroupProps>;
  export const RadioButton: React.FC<RadioButtonProps>;
}
