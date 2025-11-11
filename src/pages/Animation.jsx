import { useState, useEffect } from "react";
import "./Animation.css";

// Import images
import basketballImg from "../components/Animation/image/basket-ball-out-door-game-png-removebg-preview.png";
import footballImg from "../components/Animation/image/football-soccer-transparent-free-png-removebg-preview.png";
import volleyballImg from "../components/Animation/image/kisspng-volleyball-mikasa-sports-mitre-sports-internationa-vollybal-5b4162ddc7fef0.3071004415310118058192-removebg-preview.png";
import humanImg from "/src/assets/1f64d77e-9b16-4245-8e89-d6292310e6a1.jpg";
import cartoonImg from "../components/Animation/image/5969fbf0cc7d941e73533495da79bdf5.jpg";

function Animation() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [roll, setRoll] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [selectedBall, setSelectedBall] = useState(0);
  const [activeBallBtn, setActiveBallBtn] = useState(0);

  const fieldWidth = 600;
  const fieldHeight = 400;
  const ballSize = 100;
  const maxX = fieldWidth - ballSize;
  const maxY = fieldHeight - ballSize;

  const images = [
    null, // non - ไม่มีรูป
    basketballImg,
    footballImg,
    volleyballImg,
    humanImg,
    cartoonImg,
  ];

  const ballTypes = [
    { name: "None", icon: "⭕", className: "ball-type-btn" },
    { name: "Basketball", icon: "🏀", className: "ball-type-btn" },
    { name: "Football", icon: "⚽", className: "ball-type-btn" },
    { name: "Volleyball", icon: "🏐", className: "ball-type-btn" },
    { name: "Human", icon: "🏃", className: "ball-type-btn" },
    { name: "Cartoon", icon: "🎭", className: "ball-type-btn" },
  ];

  // Animation calculation
  const calculate = () => {
    setX((prevX) => {
      let newX = prevX;
      if (goRight) {
        newX = prevX + 8;
        if (newX >= maxX) {
          setGoRight(false);
        }
      } else {
        newX = prevX - 8;
        if (newX <= 0) {
          setGoRight(true);
        }
      }
      return newX;
    });

    setY((prevY) => {
      let newY = prevY;
      if (goDown) {
        newY = prevY + 8;
        if (newY >= maxY) {
          setGoDown(false);
        }
      } else {
        newY = prevY - 8;
        if (newY <= 0) {
          setGoDown(true);
        }
      }
      return newY;
    });

    setRoll((prevRoll) => prevRoll + 8);
  };

  // Animation loop
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        calculate();
      }, 30);
    }
    return () => clearInterval(interval);
  }, [running, goRight, goDown, x, y]);

  // Handle ball selection
  const handleBallSelect = (index) => {
    setSelectedBall(index);
    setActiveBallBtn(index);
  };

  // Toggle running
  const toggleRun = () => {
    setRunning(!running);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Number keys 0-5 for ball selection
      if (key >= "0" && key <= "5") {
        const index = parseInt(key);
        if (index < ballTypes.length) {
          handleBallSelect(index);
        }
      }

      // Space bar to toggle run
      if (key === " " || key === "Spacebar") {
        event.preventDefault();
        toggleRun();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [running]);

  return (
    <div className="animation-page">
      <div className="animation-container">
        <div className="animation-header">
          <h2 className="animation-title">
            <span className="title-icon">🎬</span>
            Interactive Animation
          </h2>
          <p className="animation-subtitle">Week 4 Assignment</p>
        </div>

        <div className="animation-stage">
          <div className="stage-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>

          <div className="animation-field">
            <div className="field-border">
              <div
                className="animation-box"
                style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px` }}
              >
                <div className="grid-pattern"></div>
                <div
                  className="animated-ball"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `rotate(${roll}deg)`,
                    backgroundImage:
                      selectedBall > 0
                        ? `url(${images[selectedBall]})`
                        : "none",
                    backgroundSize: "cover",
                    border: selectedBall === 0 ? "3px solid #00d2ff" : "none",
                  }}
                >
                  {selectedBall === 0 && (
                    <div className="default-ball-icon">⭕</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="animation-controls">
            <div className="control-panel">
              <button
                onClick={toggleRun}
                className={`control-btn primary-btn ${running ? "running" : ""}`}
              >
                <span className="btn-icon">{running ? "⏸️" : "▶️"}</span>
                <span className="btn-text">{running ? "Pause" : "Start"}</span>
              </button>

              <div className="speed-indicator">
                <div className={`speed-dot ${running ? "active" : ""}`}></div>
                <span className="speed-text">
                  {running ? "Animating" : "Paused"}
                </span>
              </div>
            </div>

            <div className="ball-selector">
              <h3 className="selector-title">
                <span className="selector-icon">🎯</span>
                Choose Animation Object
              </h3>
              <div className="ball-grid">
                {ballTypes.map((ball, index) => (
                  <button
                    key={index}
                    onClick={() => handleBallSelect(index)}
                    className={`${ball.className} ${
                      activeBallBtn === index ? "active" : ""
                    }`}
                  >
                    <span className="ball-icon">{ball.icon}</span>
                    <span className="ball-name">{ball.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="instructions-panel">
          <h3 className="instructions-title">
            <span className="instructions-icon">🎮</span>
            Keyboard Controls
          </h3>
          <div className="instructions-grid">
            <div className="instruction-item">
              <div className="instruction-key">Space</div>
              <div className="instruction-desc">Start/Pause Animation</div>
            </div>
            <div className="instruction-item">
              <div className="instruction-key">0-5</div>
              <div className="instruction-desc">
                Select Object (0=None, 1-5=Objects)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;
