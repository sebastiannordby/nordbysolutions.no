import {createRoot} from "react-dom/client";
import './index.css';
const element = document.getElementById('app');
const root = createRoot(element);

const App = () => {
  return (
      <div className={"p-8 flex flex-col gap-2 bg-slate-800 text-white h-full w-full"}>
          <header className={"p-4 border-solid border-slate-50 border-b" }>
              <h1 className={"text-3xl mb-2"}>Hei!</h1>
              <p className={"text-2xl"}>Velkommen til mitt nettsted 🧙</p>
          </header>
          <main className={"p-4 flex gap-8 flex-wrap flex-1 items-center"}>
              <div className={"right"}>
                  <img className={"rounded-full w-96"} src={"https://media-exp1.licdn.com/dms/image/D4D03AQEz3ilY4wif3g/profile-displayphoto-shrink_800_800/0/1664888390515?e=1671062400&v=beta&t=ppmpY_sWU0SPhXhvZ4ZXBwtsg1JccwGvCf-XjTisP-0"}/>
              </div>
              <div className={"p-4"}>
                  <h2 className={"text-2xl mb-2"}>Mitt navn er Sebastian Nordby</h2>
                  <p className={"text-xl"}>En oversikt over mine ferdigheter finner du på - <a className={"underline"} href={"https://www.linkedin.com/in/sebastian-nordby-b45087152"} target={"_blank"}>LinkedIn</a>💻</p>
                  <p className={"text-xl"}>Prosjekter utenom jobb finner du på - <a className={"underline"} href={"https://github.com/sebastiannordby"} target={"_blank"}>Github</a>💻</p>
              </div>
          </main>
          <footer>
          </footer>
      </div>
  );
};


root.render(<App></App>);