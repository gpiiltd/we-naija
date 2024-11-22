import { FC } from "react";
import { ClipLoader } from "react-spinners";
import { ButtonProps } from "./types";

// Assuming `Icon` is a component that renders the icon, such as from `react-icons` or a custom one.
const ButtonComponent: FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  active,
  bg_color,
  text_color,
  border_color,
  icon,  // Icon prop for rendering an icon or image
}) => {
  return (
    <div
      style={{
        cursor: active ? "pointer" : "default",
        fontSize: "1rem",
        borderRadius: "0.380rem",
        fontWeight: "400",
        transition: "all 0.3s",
        backgroundColor: bg_color,
        color: text_color,
        opacity: active ? 1 : 0.3,
        borderColor: active ? border_color : "transparent",
        borderStyle: "solid",
        padding: "0.3rem 0.4rem", 
      

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
          fontWeight: "300",
          backgroundColor: "transparent",
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
