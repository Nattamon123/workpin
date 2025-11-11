import { useState } from "react";
import Value from "./Value";

const Adder = () => {
  const [a, setA] = useState(0); // State สำหรับ A
  const [b, setB] = useState(0); // State สำหรับ B

  return (
    <div
      className="border border-black border-2 mx-auto mt-3 rounded-4"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center">Adder</h1>
      <div className="d-flex justify-content-between">
        <div className="badge bg-secondary bg-transparent-50">A = {a}</div>
        <div className="badge bg-primary">A + B = {a + b}</div>
        <div className="badge bg-secondary">B = {b}</div>
      </div>
      <div className="d-flex gap-2 justify-content-center">
        <Value name={"A"} onChange={setA} />
        <Value name={"B"} onChange={setB} />
      </div>
    </div>
  );
};

export default Adder;