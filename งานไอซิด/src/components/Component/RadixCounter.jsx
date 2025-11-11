import { useState } from "react";

const RadixCounter = () => {
  const [value, setValue] = useState(0);

  const minus = () => {
    setValue((prev) => (prev <= 0 ? 4095 : prev - 1));
  };

  const add = () => {
    setValue((prev) => (prev >= 4095 ? 0 : prev + 1));
  };

  const reset = () => {
    setValue(0);
  };

  return (
    <div
      className="border border-2 border-black rounded-5 p-5 m-auto mt-5"
      style={{ width: "400px" }}
    >
      <div className="text-center fw-bold">RADIX COUNTER</div>
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <span className="fw-bold">[HEX]</span>
          <br />
          {value.toString(16).toUpperCase().padStart(3, "0")}
        </div>
        <div className="text-center">
          <span className="fw-bold">[DEC]</span>
          <br />
          {value.toString(10).padStart(4, "0")}
        </div>
        <div className="text-center">
          <span className="fw-bold">[OCT]</span>
          <br />
          {value.toString(8).padStart(4, "0")}
        </div>
        <div className="text-center">
          <span className="fw-bold">[BIN]</span>
          <br />
          {value.toString(2).padStart(12, "0")}
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-around">
        <button className="btn btn-danger" onClick={minus}>
          &minus;
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          RESET
        </button>
        <button className="btn btn-success" onClick={add}>
          +
        </button>
      </div>
    </div>
  );
};

export default RadixCounter;
