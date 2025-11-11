import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { courseData, footerData } from "../data/studentData";
import "./MainLayout.css";

const StyledMainLayout = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 2px solid transparent;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
      linear-gradient(90deg, #00d2ff, #3a7bd5, #00d2ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 700;
    font-size: 1.2rem;
    color: #2c3e50;
  }

  .brand-badge {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 800;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
    transition: transform 0.3s ease;
  }

  .brand-badge:hover {
    transform: rotate(10deg) scale(1.1);
  }

  .nav-links {
    display: flex;
    gap: 0.5rem;
    list-style: none;
  }

  .nav-link {
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 210, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  .nav-link:hover::before {
    left: 100%;
  }

  .nav-link:hover {
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 210, 255, 0.4);
  }

  .nav-link.active {
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
  }

  .icon {
    font-size: 1.2rem;
  }

  .main-content {
    flex: 1;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: calc(100vh - 70px - 200px);
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .page-header {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .page-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00d2ff, #3a7bd5, #00d2ff);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .page-header h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .outlet {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    min-height: 400px;
  }

  .footer {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    padding: 2rem 0;
    margin-top: auto;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-info h3 {
    color: #00d2ff;
    margin-bottom: 0.5rem;
  }

  .footer-social a {
    color: white;
    font-size: 1.5rem;
    margin: 0 0.5rem;
    transition: all 0.3s ease;
  }

  .footer-social a:hover {
    color: #00d2ff;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 1rem;
      height: 60px;
    }

    .brand {
      font-size: 1rem;
    }

    .brand-badge {
      width: 35px;
      height: 35px;
      font-size: 0.9rem;
    }

    .nav-links {
      gap: 0.25rem;
    }

    .nav-link {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .nav-link span {
      display: none;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .footer-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
`;

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // เช็คสถานะการ login
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <StyledMainLayout>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-container">
            <div className="brand">
              <div className="brand-badge">{courseData.code}</div>
              <span>{courseData.name}</span>
            </div>

            <ul className="nav-links">
              <li>
                <Link
                  to="/home"
                  className={`nav-link ${isActive("/home") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/calculator"
                  className={`nav-link ${isActive("/calculator") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v4h10V4H7m0 6v2h2v-2H7m4 0v2h2v-2h-2m4 0v2h2v-2h-2m-8 4v2h2v-2H7m4 0v2h2v-2h-2m4 0v2h2v-2h-2m-8 4v2h2v-2H7m4 0v2h2v-2h-2m4 0v2h2v-2h-2Z" />
                  </svg>
                  <span>Calc</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className={`nav-link ${isActive("/products") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                  </svg>
                  <span>Products</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className={`nav-link ${isActive("/cart") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                  <span>Cart</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/animation"
                  className={`nav-link ${isActive("/animation") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Animate</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/component"
                  className={`nav-link ${isActive("/component") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                  <span>Component</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/todo"
                  className={`nav-link ${isActive("/animation") ? "active" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Todos</span>
                </Link>
              </li>

              {isLoggedIn && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{
                      background: "linear-gradient(135deg, #ff4444, #cc0000)",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon"
                    >
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <div className="content-wrapper">
            <div className="page-header">
              <h1>
                {courseData.code} - {courseData.name}
              </h1>
            </div>

            <div className="outlet">
              <Outlet />
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-info">
              <h3>{footerData.university}</h3>
              <p>{footerData.facultyAndMajor}</p>
            </div>
            <div className="footer-social">
              <a href="/">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </StyledMainLayout>
  );
}

export default MainLayout;
