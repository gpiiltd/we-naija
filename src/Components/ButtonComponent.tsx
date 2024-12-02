import { FC } from "react";
import { ClipLoader } from "react-spinners";
import { ButtonProps } from "./types";

const ButtonComponent: FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  active,
  bg_color,
  text_color,
  border_color,
  icon,  
}) => {
  return (
    <div
      style={{
        cursor: active ? "pointer" : "default",
        fontSize: "1rem",
        borderRadius: "0.380rem",
        transition: "all 0.3s",
        backgroundColor: bg_color,
        color: text_color,
        opacity: active ? 1 : 0.3,
        borderColor: active ? border_color : "transparent",
        borderStyle: "solid",
        padding: "0.3rem 0.6rem", 
        borderWidth:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClick}
        disabled={loading || !active}
        style={{
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
          letterSpacing: "0.05em",
          fontWeight: "500",
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        {loading ? (
          <ClipLoader color="#B8C1CB" size={24} />
        ) : (
          <>
            {icon && <span>{icon}</span>}
            <span>{text}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonComponent;
