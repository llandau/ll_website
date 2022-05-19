import TextSvg from './TextSvg.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {TextSvg()}
        <p>
          Hello Leo.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
