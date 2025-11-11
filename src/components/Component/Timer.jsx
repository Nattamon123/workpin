import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const Timer = () => {
    const [sec, setsec] = useState(50)
    const [min,setmin] = useState(0)
    const [isRunning,setIsRunning] = useState(false)
    const second = sec + 's'
    const minute = min + 'm'
    useEffect(() =>{
        let interval
        if(isRunning){
            interval = setInterval(() =>{
                setsec((prevsec) =>{
                    if(prevsec == 59){
                        setmin((prevmin) => prevmin + 1)
                        return 0
                    }
                    return prevsec + 1
                })
        },1000)
        }else{
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    },[isRunning])
const handleReset = () =>{
    setmin(0)
    setsec(0)
    setIsRunning(false)
}
  return (
    <div
      className="border border-black border-2 m-auto rounded-4 mt-3 bg-secondary bg-opacity-50
   p-2 "
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">Timer</h1>
      <div className="border border-black border-2 bg-light rounded-2">
        {min > 0 && minute}{second}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
        <button className="btn btn-danger" onClick={handleReset}><i className="bi bi-arrow-clockwise"></i>Reset</button>
        <button
          className="btn btn-success"
          onClick={() => setIsRunning((prev) => !prev)}
        >
         <i class="bi bi-play"></i> Run
        </button>
      </div>
    </div>
  );
};
export default Timer;
