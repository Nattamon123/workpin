import { useState } from "react";
import Value from "./Value";
const Tempature = () => {
    const [a, setA] = useState(0); // State สำหรับ A
    const [b, setB] = useState(0); // State สำหรับ B
    const [c, setc] = useState(0);
    return (
      <div
        className="border border-black border-2 mx-auto mt-3 rounded-4"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center">Temperature</h1>
        <div className="d-flex justify-content-between">
          <div
            className="badge bg-secondary d-flex justify-content-center align-items-center"
            style={{ height: "50px", width: "100px", textAlign: "center", marginLeft: "25px" }}
          >
           {a.toFixed(2)}℃
          </div>
          <div
            className="badge bg-secondary d-flex justify-content-center align-items-center"
            style={{ height: "50px", width: "100px", textAlign: "center" }}
          >
           {c.toFixed(2)}°F
          </div>
          <div
            className="badge bg-secondary d-flex justify-content-center align-items-center"
            style={{ height: "50px", width: "100px", textAlign: "center", marginRight: "25px" }}
          >
           {b.toFixed(2)}°K
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <Value name={"CELSIUS"} onChange={setA} type={"real"}/>
          <Value name={"FAHRENHEIT"} onChange={setc} type={"real"}/>
          <Value name={"KELVIN"} onChange={setB} type={"real"}/>
        </div>
      </div>
    );
  };
  export default Tempature