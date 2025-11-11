import { useState, useEffect } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [now, setNow] = useState("");
  const [pre, setPre] = useState("");
  const [operator, setOperator] = useState(null);
  const [state, setState] = useState("idle");
  const [lastNum, setLastNum] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [activeOperator, setActiveOperator] = useState(null);

  // อัปเดต display
  useEffect(() => {
    if (now === "") {
      setDisplay("0");
    } else if (display.length < 12) {
      setDisplay(now);
    }
  }, [now]);

  // Clear all
  const clearAll = () => {
    setNow("");
    setPre("");
    setOperator(null);
    setLastNum(null);
    setState("idle");
    setDisplay("0");
    setActiveOperator(null);
  };

  // เพิ่มตัวเลข
  const addNumber = (num) => {
    if (state === "idle" || state === "result") {
      setNow(String(num));
      setState("type");
    } else if (state === "type") {
      if (now.length < 12) {
        setNow(now + num);
      }
    } else if (state === "setop") {
      setNow(String(num));
      setState("type");
    }
    highlightButton(num);
  };

  // เพิ่มทศนิยม
  const addDecimal = () => {
    if (state === "idle" || state === "result") {
      setNow("0.");
      setState("type");
    } else if (state === "type" && !now.includes(".")) {
      setNow(now + ".");
    }
  };

  // ตั้งค่า operator
  const setOp = (op) => {
    if (state === "type" || state === "result") {
      setPre(now);
      setOperator(op);
      setState("setop");
      setActiveOperator(op);
    }
  };

  // คำนวณ
  const equal = () => {
    if (state === "type" && operator) {
      const num1 = Number(pre);
      let num2;

      if (now !== "") {
        num2 = Number(now);
        setLastNum(num2);
      } else {
        num2 = lastNum;
      }

      let result = 0;
      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "×":
          result = num1 * num2;
          break;
        case "÷":
          result = num1 / num2;
          break;
        default:
          return;
      }

      setNow(String(result));
      setPre(String(result));
      setDisplay(String(result));
      setState("result");
      setActiveOperator(null);
    }
  };

  // Highlight button effect
  const highlightButton = (id) => {
    setActiveButton(id);
    setTimeout(() => {
      setActiveButton(null);
    }, 200);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key === "Enter") {
        equal();
      } else if (key >= "0" && key <= "9") {
        addNumber(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        const opMap = { "+": "+", "-": "-", "*": "×", "/": "÷" };
        setOp(opMap[key]);
      } else if (key === "." || key === ",") {
        addDecimal();
      } else if (key === "c" || key === "C" || key === "Escape") {
        clearAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [now, pre, operator, state, lastNum]);

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2 className="calculator-title">
            <span className="title-icon">🧮</span>
            Modern Calculator
          </h2>
          <p className="calculator-subtitle">Week 3 Assignment</p>
        </div>

        <div className="calculator">
          <div className="display-container">
            <div className="display">{display}</div>
            <div className="display-label">Result</div>
          </div>

          <div className="buttons">
            <div className="button-row">
              <button onClick={clearAll} className="memory-btn">
                MC
              </button>
              <button className="memory-btn">MR</button>
              <button className="memory-btn">M+</button>
              <button className="memory-btn">M-</button>
              <button
                onClick={clearAll}
                className={`clear-btn ${activeButton === "clear" ? "active" : ""}`}
              >
                C
              </button>
            </div>

            <div className="button-row">
              {[7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => addNumber(num)}
                  className={`number-btn ${activeButton === num ? "active" : ""}`}
                >
                  {num}
                </button>
              ))}
              <button
                className={`operator-btn ${activeOperator === "÷" ? "operator-active" : ""}`}
                onClick={() => setOp("÷")}
              >
                ÷
              </button>
            </div>

            <div className="button-row">
              {[4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => addNumber(num)}
                  className={`number-btn ${activeButton === num ? "active" : ""}`}
                >
                  {num}
                </button>
              ))}
              <button
                className={`operator-btn ${activeOperator === "×" ? "operator-active" : ""}`}
                onClick={() => setOp("×")}
              >
                ×
              </button>
            </div>

            <div className="button-row">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => addNumber(num)}
                  className={`number-btn ${activeButton === num ? "active" : ""}`}
                >
                  {num}
                </button>
              ))}
              <button
                className={`operator-btn ${activeOperator === "-" ? "operator-active" : ""}`}
                onClick={() => setOp("-")}
              >
                -
              </button>
            </div>

            <div className="button-row">
              <button
                onClick={() => addNumber(0)}
                className={`number-btn zero-btn ${activeButton === 0 ? "active" : ""}`}
              >
                0
              </button>
              <button onClick={addDecimal} className="decimal-btn">
                .
              </button>
              <button
                className={`operator-btn ${activeOperator === "+" ? "operator-active" : ""}`}
                onClick={() => setOp("+")}
              >
                +
              </button>
              <button className="equal-btn" onClick={equal}>
                =
              </button>
            </div>
          </div>
        </div>

        <div className="calculator-footer">
          <div className="keyboard-hint">
            <span className="hint-icon">⌨️</span>
            <span>Use keyboard for faster input</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
