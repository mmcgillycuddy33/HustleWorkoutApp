import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "20px 28px",
        backgroundColor: "white",
        borderBottom: "1px solid #ccc",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          cursor: "pointer",
          margin: 0,
          fontFamily: "HustleFont",
          fontSize: "72px",
          letterSpacing: "4px",
          lineHeight: 1,
        }}
        onClick={() => navigate("/")}
      >
        HUSTLE
      </h1>
    </div>
  );
}

export default Header;