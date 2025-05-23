import React, { FC, useState } from "react";
import { useField, useFormikContext } from "formik";
import { TextInputProps, TypographyVariant } from "../types";
import Typography from "../Typography/Typography";
import { RiErrorWarningLine } from "react-icons/ri";

const TextAreaField: FC<TextInputProps & { rows?: number }> = ({
  label,
  helperText,
  placeholder,
  focusStyle,
  rows = 5,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const { setTouched, validateField } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setTouched({ [props.name]: true });
    setIsFocused(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e);
    setTouched({ [props.name]: true });
    validateField(props.name);
  };

  return (
    <div className="mb-4">
      <label htmlFor={props.name}>
        <Typography variant={TypographyVariant.NORMAL}>{label}</Typography>
      </label>
      <div className="relative">
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={`mt-1 block text-light_gray text-base tracking-wide w-full_width px-3 py-2 border border-primary_color rounded-md shadow-sm focus:outline-none placeholder-primary_color placeholder-opacity-50 placeholder-xs 
       `}
          {...field}
          {...props}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          style={{
            ...(isFocused ? { borderColor: focusStyle } : {}),
          }}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="flex gap-1">
          <RiErrorWarningLine size={24} color={"#007A61"} className="pt-1" />

          <Typography
            variant={TypographyVariant.SMALL}
            className="text-light_gray mt-1"
          >
            {meta.error}
          </Typography>
        </div>
      ) : (
        helperText && (
          <div>
            <RiErrorWarningLine size={24} color={"#007A61"} />

            <Typography variant={TypographyVariant.SMALL} className="mt-1">
              {helperText}
            </Typography>
          </div>
        )
      )}
    </div>
  );
};

export default TextAreaField;
