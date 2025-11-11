 import { studentData } from "../data/studentData";
 import "./Home.css";
 import { Link } from "react-router-dom";
 import profileImg from "../assets/1f64d77e-9b16-4245-8e89-d6292310e6a1.jpg";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image-wrapper">
                <div className="profile-border"></div>
                <img
                  src={profileImg}
                  alt={`${studentData.name} profile`}
                  className="profile-image"
                />
                <div className="status-dot"></div>
              </div>

              <div className="profile-badges">
                <span className="badge badge-primary">Student</span>
                <span className="badge badge-secondary">Active</span>
              </div>
            </div>

            <div className="profile-content">
              <h1 className="profile-name">
                {studentData.name}
                <span className="wave-emoji">👋</span>
              </h1>

              <div className="student-id-card">
                <span className="id-label">Student ID</span>
                <span className="id-value">{studentData.studentId}</span>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">🎓</div>
                  <div className="info-content">
                    <span className="info-label">Year</span>
                    <span className="info-value">{studentData.year}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📚</div>
                  <div className="info-content">
                    <span className="info-label">Major</span>
                    <span className="info-value">{studentData.major}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">🏛️</div>
                  <div className="info-content">
                    <span className="info-label">Faculty</span>
                    <span className="info-value">{studentData.faculty}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">🌟</div>
                  <div className="info-content">
                    <span className="info-label">University</span>
                    <span className="info-value">{studentData.university}</span>
                  </div>
                </div>
              </div>

              <div className="introduction-section justify-content-center">
                <h2 className="section-title justify-content-center">
                  <span className="title-icon">💬</span>
                  About Me
                </h2>
                <div className="introduction-content ">
                  {studentData.introduction.map((paragraph, index) => (
                    <p key={index} className="intro-text ">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="action-buttons">
                <Link to="/products" className="btn btn-primary">
                  <i className="bi bi-shop btn-icon"></i>
                  <span>Shop Products</span>
                </Link>
                <Link to="/calculator" className="btn btn-secondary">
                  <i className="bi bi-calculator btn-icon"></i>
                  <span>Open Calculator</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
