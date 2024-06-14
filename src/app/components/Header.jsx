import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ user, onLogout }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsDropdownOpen(false); // Fecha o dropdown após a navegação
  };


  return (
    <header className="header">
      <div className="header-left">
        <button className="home-button" onClick={() => handleNavigation("/artistas")}>
          Home
        </button>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-profile">
            <div className="user-info" onClick={handleProfileClick}>
              <span className="user-name">{user.nome}</span>
              <img
                className="user-avatar"
                src={user.avatar || "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} 
                alt="Avatar"
              />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => handleNavigation("/perfil")}
                >
                  Perfil
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleNavigation("/favoritas")}
                >
                  Favoritas
                </button>
                <button className="dropdown-item" onClick={onLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="login-button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
