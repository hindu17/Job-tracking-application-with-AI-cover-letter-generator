import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // 🌙 theme state
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const getTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/add") return "Add Job";
    if (location.pathname === "/ai") return "AI Generator";
    return "";
  };

  const logout = () => {
    localStorage.removeItem("token");
    // window.location.href = "/login";
    navigate("/login");
  };

  return (
    <div className="navbar">
      
      {/* LEFT SIDE TITLE */}
      <h2>{getTitle()}</h2>

      {/* RIGHT SIDE ACTIONS */}
      <div className="nav-actions">
        
        {/* 🌙 DARK MODE TOGGLE */}
        <button
          className="toggle-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* 🚪 LOGOUT */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;