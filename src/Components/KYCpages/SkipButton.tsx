import React from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { useNavigate } from "react-router-dom";

const SkipButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[42%] flex justify-center mt-8"
      style={{ color: "#ED7D31" }}
      onClick={() => navigate("/kyc/*")}
    >
      <Typography
        variant={TypographyVariant.SMALL}
        className="underline cursor-pointer"
      >
        Skip, I’ll do it later
      </Typography>
    </div>
  );
};

export default SkipButton;
