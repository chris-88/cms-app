import { BackIcon } from "../../assets/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ButtonBackProps {
  title: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ title }) => {
  const notify = () =>
    toast("You clicked a button...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2rem",
        gap: "1.5rem",
        width: "100%",
        margin: "2rem 0",
        transition: "color 0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = "#0000ffff")}
      onMouseOut={(e) => (e.currentTarget.style.color = "black")}
    >
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          color: "black",
          fontSize: "16px",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <BackIcon />
        Back
      </button>

      <button
        onClick={notify}
        style={{
          backgroundColor: "#0000ffff",
          justifyContent: "center",
          alignItems: "center",
          height: "60px",
          width: "200px",
          color: "white",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: "16px",
          padding: "0.5rem 1rem",
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonBack;
