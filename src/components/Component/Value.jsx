import { useEffect, useState } from "react";

const Value = ({ name, initial, type, onChange }) => {
  const [value, setValue] = useState(0);
  let newValue = 0;
  useEffect(() => {
    setValue(initial || 0);
  }, [initial]);

  return (
    <div
      className="border border-black border-2 m-auto rounded-4 mt-3 p-2"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{name}</h1>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-danger"
          onClick={() => {
            const newValue = value - 1;
            setValue(newValue);
            onChange(newValue);
          }}
        >
          &minus;
        </button>
        <div>{type === "real" ? value.toFixed(2) : Math.round(value)}</div>
        <button
          className="btn btn-success"
          onClick={() => {
            if (type === "real") {
              newValue = value + 0.1;
            }
            newValue = value + 1;
            setValue(newValue);
            onChange(newValue);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Value;
