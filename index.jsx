import {createRoot} from "react-dom/client";
import './index.css';
const element = document.getElementById('app');
const root = createRoot(element);

const App = () => {
  return (
      <div className={"p-2 flex flex-col gap-2 bg-white"}>
          <header>
              <h1>Velkommen til min hjemmeside</h1>
              <p>Sebastian Nordby</p>
          </header>
          <main>
              <p>lorem20</p>
          </main>
          <footer>
              <ul>
                  <li>LinkedIn</li>
                  <li>Github</li>
              </ul>
          </footer>
      </div>
  );
};


root.render(<App></App>);