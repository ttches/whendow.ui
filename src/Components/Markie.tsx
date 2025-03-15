import { useEffect } from "react";
import markieImage from "../assets/markie.png";

const Markie = () => {
  useEffect(() => {
    document.title = "Markie";
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000", // Black background to fill any gaps
      }}
    >
      <img
        src={markieImage}
        alt="Markie"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // This will stretch the image to cover the container
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default Markie;
