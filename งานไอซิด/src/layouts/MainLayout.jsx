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

    display: block;
    background: radial-gradient(
      1200px 600px at 10% 10%,
      #0b1220 0%,
      #0a0f1a 35%,
      #0b0f17 100%
    );
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100vh;
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-container {
    height: 100%;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    align-items: stretch;
  }

  .brand {
    display: flex;

    align-items: center;

    gap: 0.75rem;
    font-weight: 700;

    font-size: 1.1rem;
    color: #e5e7eb;
  }

  .brand-badge {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #06b6d4, #7c3aed);
    display: flex;
    align-items: center;

    justify-content: center;

    color: white;

    font-weight: 800;

    font-size: 1rem;
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.35);
    transition: transform 0.3s ease;
  }

  .brand-badge:hover {
    transform: rotate(10deg) scale(1.1);
  }

  .nav-links {
    display: flex;

    flex-direction: column;
    gap: 0.5rem;

    list-style: none;

    margin-top: 1rem;
  }

  .nav-link {
    padding: 0.85rem 1rem;
    border-radius: 12px;
    text-decoration: none;

    color: #e5e7eb;
    font-weight: 600;

    transition: all 0.3s ease;

    position: relative;

    overflow: hidden;

    display: flex;

    align-items: center;

    gap: 0.75rem;

    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .nav-link::before {
    content: "";

    position: absolute;

    top: 0;

    left: -120%;
    width: 120%;
    height: 100%;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );

    transition: left 0.5s ease;
  }

  .nav-link:hover::before {
    left: 100%;
  }

  .nav-link:hover {
    background: linear-gradient(
      135deg,
      rgba(6, 182, 212, 0.2),
      rgba(124, 58, 237, 0.2)
    );
    color: #ffffff;
    transform: translateX(4px);
    box-shadow: 0 6px 24px rgba(6, 182, 212, 0.25);
    border-color: rgba(6, 182, 212, 0.25);
  }

  .nav-link.active {
    background: linear-gradient(135deg, #06b6d4, #7c3aed);
    color: white;
    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.35);
    border-color: transparent;
  }

  .icon {
    font-size: 1.2rem;
  }

  .main-content {
    margin-left: 260px;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(2, 6, 23, 0.4) 0%,
      rgba(15, 23, 42, 0.6) 100%
    );
    padding-top: 0;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .page-header {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 20px;

    padding: 1.5rem 2rem;

    margin-bottom: 2rem;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    text-align: center;

    position: relative;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .page-header::before {
    content: "";

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    height: 4px;

    background: linear-gradient(90deg, #06b6d4, #7c3aed, #06b6d4);
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
    color: #e5e7eb;
    font-size: 2.25rem;

    margin-bottom: 0.25rem;

    background: linear-gradient(135deg, #67e8f9, #a78bfa);
    -webkit-background-clip: text;

    background-clip: text;

    -webkit-text-fill-color: transparent;
  }

  .outlet {
    background: rgba(255, 255, 255, 0.06);

    border-radius: 20px;

    padding: 2rem;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);

    min-height: 400px;

    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .outlet-legacy {
    background: #ffffff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    min-height: 400px;
    border: 1px solid #e5e7eb;
  }

  .footer {
    background: linear-gradient(135deg, #0b1220, #0a0f1a);
    color: white;
    padding: 2rem 0;

    margin-top: auto;

    margin-left: 260px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
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
    color: #67e8f9;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    .navbar {
      width: 80px;
    }

    .nav-container {
      padding: 1rem 0.5rem;
    }

    .brand {
      font-size: 0.95rem;
    }

    .brand-badge {
      width: 40px;
      height: 40px;
      font-size: 0.9rem;
    }

    .nav-link {
      padding: 0.75rem 0.75rem;
      font-size: 0.9rem;
    }

    .nav-link span {
      display: none;
    }

    .main-content {
      margin-left: 80px;
    }

    .page-header h1 {
      font-size: 1.75rem;
    }

    .footer-content {
      flex-direction: column;

      gap: 1rem;

      text-align: center;
    }

    .footer {
      margin-left: 80px;
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

  const isTodoRoute = location.pathname.startsWith("/todo");

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
                  className={`nav-link ${isActive("/todo") ? "active" : ""}`}
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

            <div className={`outlet ${isTodoRoute ? "outlet-legacy" : ""}`}>
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
              <a href="https://www.facebook.com/nattamon.chotikul.2025/">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/balabew._/">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://github.com/Nattamon123?tab=repositories">
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
