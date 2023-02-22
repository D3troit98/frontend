import "./App.css";
import LgaSelect from "./components/LgaSelect";
import PollingUnitForm from "./components/PollingUnitForm";
import PollSelect from "./components/PollSelect";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Polling Unit</p>
      </header>
      <PollSelect />
      <LgaSelect />
      <PollingUnitForm />
    </div>
  );
}

export default App;
