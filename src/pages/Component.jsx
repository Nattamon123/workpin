import Adder from "../components/Component/Adder.jsx";
import RadixCounter from "../components/Component/RadixCounter.jsx";
import Tempature from "../components/Component/Tempature.jsx";
import Timer from "../components/Component/Timer.jsx";
import Value from "../components/Component/Value.jsx";
import "./Component.css";

function Component() {
  return (
    <div className="component-page">
      <div className="component-header">
        <h2 className="component-title">
          <span className="title-icon">🧩</span>
          React Components Showcase
        </h2>
        <p className="component-subtitle">Week 6 Assignment</p>
      </div>

      <div className="component-grid">
        <div className="component-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🔢</span>
              Counter Components
            </h3>
            <p className="card-description">
              Interactive counter with real and integer types
            </p>
          </div>
          <div className="card-content">
            <Value name={"Real Counter"} initial={0} type={"real"} />
            <Value name={"Integer Counter"} initial={0} />
          </div>
        </div>

        <div className="component-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">⏱️</span>
              Timer Component
            </h3>
            <p className="card-description">
              Countdown timer with start/stop functionality
            </p>
          </div>
          <div className="card-content">
            <Timer />
          </div>
        </div>

        <div className="component-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">➕</span>
              Adder Component
            </h3>
            <p className="card-description">Simple addition calculator</p>
          </div>
          <div className="card-content">
            <Adder />
          </div>
        </div>

        <div className="component-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🌡️</span>
              Temperature Converter
            </h3>
            <p className="card-description">
              Convert between Celsius and Fahrenheit
            </p>
          </div>
          <div className="card-content">
            <Tempature />
          </div>
        </div>

        <div className="component-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🔢</span>
              Radix Counter
            </h3>
            <p className="card-description">
              Counter with different number bases
            </p>
          </div>
          <div className="card-content">
            <RadixCounter />
          </div>
        </div>
      </div>

      <div className="component-footer">
        <div className="tech-stack">
          <h3 className="tech-title">
            <span className="tech-icon">⚛️</span>
            Technologies Used
          </h3>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-badge">React</span>
              <span className="tech-desc">Component-based UI</span>
            </div>
            <div className="tech-item">
              <span className="tech-badge">Hooks</span>
              <span className="tech-desc">useState, useEffect</span>
            </div>
            <div className="tech-item">
              <span className="tech-badge">CSS3</span>
              <span className="tech-desc">Modern styling</span>
            </div>
            <div className="tech-item">
              <span className="tech-badge">JavaScript</span>
              <span className="tech-desc">ES6+ features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
