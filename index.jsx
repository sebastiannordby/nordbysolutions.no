import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './index.css';

const element = document.getElementById('app');
const root = createRoot(element);

const TopNavigation = () => {
    return (
        <nav className={"flex items-center flex-wrap"}>
            <h1 className={"mr-auto text-xl"}>SebastianNordby.no</h1>

            <ul className={"p-2 flex gap-4 items-center justify-end text-l"}>
                <li><Link to={"/"}>Hjem</Link></li>
                <li><Link to={"/about"}>Om meg</Link></li>
                <li><Link to={"/contact"}>Kontakt</Link></li>
            </ul>
        </nav>
    );
};

const FrontPage = () => {
  return (
      <div className={"front-page h-full w-full h-auto"}>
          <div class={"overlay p-8 h-full w-full"}>
              <div class="content flex flex-col text-white h-full w-full">
                  <TopNavigation></TopNavigation>
                  <main className={"text-center justify-center p-4 flex gap-8 flex-wrap flex-1 items-center"}>
                      <div className={"right"}>
                          <img className={"rounded-full w-96"} src={"https://media-exp1.licdn.com/dms/image/D4D03AQEz3ilY4wif3g/profile-displayphoto-shrink_800_800/0/1664888390515?e=1671062400&v=beta&t=ppmpY_sWU0SPhXhvZ4ZXBwtsg1JccwGvCf-XjTisP-0"}/>
                      </div>
                      <div className={"p-4"}>
                          <h2 className={"text-2xl mb-2"}>Mitt navn er Sebastian Nordby</h2>
                          <p className={"text-xl"}>En oversikt over mine ferdigheter finner du på - <a className={"underline"} href={"https://www.linkedin.com/in/sebastian-nordby-b45087152"} target={"_blank"}>LinkedIn</a>💻</p>
                          <p className={"text-xl"}>Prosjekter utenom jobb finner du på - <a className={"underline"} href={"https://github.com/sebastiannordby"} target={"_blank"}>Github</a>💻</p>
                      </div>
                  </main>
              </div>
          </div>
      </div>
  );
};


const AboutMePage = () => {
    return (
        <div className={"contact"}>
            <h1 className={"text-xl"}>Om meg</h1>
        </div>
    );
};

const ContactMePage = () => {
    return (
        <div className={"contact"}>
            <h1 className={"text-xl"}>Kontakt meg</h1>
        </div>
    );
};

const Application = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}></Route>
                <Route path={"/about"} element={<AboutMePage/>}></Route>
                <Route path={"/contact"} element={<ContactMePage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

root.render(<Application/>);