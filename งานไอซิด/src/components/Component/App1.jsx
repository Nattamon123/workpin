import Adder from "./Adder.jsx";
import "./App.css";
import RadixCounter from "./RadixCounter.jsx";
import Tempature from "./tempature.jsx";
import Timer from "./Timer.jsx";
import Value from "./Value.jsx";
function App1() {
  return (
    <>
      <Value name={"Counter"} initial={0} type={"real"} />
      <Value name={"Counter"} initial={0} />
      <Timer />
      <Adder />
      <Tempature />
    </>
  );
}

export default App1;
