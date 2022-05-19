import './App.css';
import logo from './images/ll_logo.png';
import MatterComponent from './MatterComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="ll logo" />
      </header>
      <MatterComponent />
    </div>
  );
}

export default App;
