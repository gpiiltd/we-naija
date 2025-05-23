import React, { useState } from "react";
import { useField } from "formik";
import { TextInputProps, TypographyVariant } from "../types";
import Typography from "../Typography";
import Icon from "../../Assets/SvgImagesAndIcons";

const InputField: React.FC<TextInputProps> = ({
  label,
  helperText,
  icon,
  type,
  onClick,
  focusStyle,
  setFieldValue,
  setFieldTouched,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setFieldTouched!(props.name, true, false);
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue!(props.name, value);
    setFieldTouched!(props.name, true, false);
  };

  return (
    <div className="relative w-full ">
      <input
        type={type}
        className={`text-base  font-normal pt-5 pl-5 block w-full  flex justify-center items-center  px-3 py-3 border border-primary_color rounded-md shadow-sm focus:outline-none placeholder-transparent ${
          meta.touched && meta.error
            ? "border-error focus:border-error focus:ring-error"
            : `focus:border-${focusStyle} focus:ring-${focusStyle}`
        }`}
        placeholder=" "
        {...field}
        {...props}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
        style={{
          ...(isFocused && !meta.error ? { borderColor: focusStyle } : {}),
        }}
      />
      <label
        htmlFor={props.name}
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          field.value || isFocused
            ? "top-1 text-xs text-gray-600"
            : "top-4 text-base text-gray-400"
        }`}
      >
        <Typography variant={TypographyVariant.NORMAL}>{label}</Typography>
      </label>
      {meta.touched && meta.error ? (
        <div className="w-full md:w-[350px] lg:w-[500px] overflow-hidden">
          {" "}
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-error mt-1 text-left"
          >
            {meta.error}
          </Typography>
        </div>
      ) : (
        helperText &&
        !meta.error &&
        meta.touched &&
        isFocused && (
          <div className="flex gap-2 items-center">
            <Icon type="check" className="pt-1" />
            <div className="flex gap-2">
              <Typography
                variant={TypographyVariant.SMALL}
                className="mt-1 text-left text-green-700"
              >
                {helperText}
              </Typography>
            </div>
          </div>
        )
      )}
      <span
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onClick}
      >
        {icon}
      </span>
    </div>
  );
};

export default InputField;
