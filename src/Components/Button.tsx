import{ FC } from "react";
import { ClipLoader} from "react-spinners";
import { ButtonProps } from "./types";


const Button: FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  active,
  bg_color,
  text_color,
  border_color,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        cursor: active ? "pointer" : "default",
        alignItems: "center",
        justifyContent: "center",
        alignContent:'center',
        fontSize: "1rem",
        borderRadius: "0.380rem",
        fontWeight: "500",
        transition: "all 0.3s",
        backgroundColor: bg_color,
        color: text_color,
        opacity: active ? 1 : 0.3,
        borderWidth: active ? 2 : 0,
        borderColor: active ? border_color : "transparent",
        borderStyle: "solid",
      }}
    >
      <button
        onClick={onClick}
        disabled={loading || !active}
        style={{
          width: "100%",
          height: "3.7rem", 
          border: "none",
          display: "flex",
          
          justifyContent: "center", 
          alignItems: "center",
          alignContent:'center', 
          fontSize: "1rem",
          letterSpacing: "0.05em",
          fontWeight: "bold",
          backgroundColor: "transparent", 
        }}
      >
        {loading ? (
       
            <ClipLoader 
              color="#B8C1CB"
            />
        ) : (
          <span>{text}</span>
        )}
      </button>
    </div>
  );
};

export default Button;
