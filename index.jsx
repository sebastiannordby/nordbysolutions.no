import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './index.css';
import githubLogo from '/images/github.png';
import linkedinLogo from '/images/linkedin.png';

const element = document.getElementById('app');
const root = createRoot(element);

const FrontPage = () => {
  return (
      <div className={"front-page h-full w-full h-auto"}>
          <div class={"overlay p-8 h-full w-full"}>
              <div class="content flex flex-col h-full w-full">
                  <header className={"p-4 flex items-center flex-wrap"}>
                      <h1 className={"mr-auto text-xl font-medium"}>SebastianNordby.no</h1>
                  </header>
                  <main className={"text-center justify-center p-4 flex gap-8 flex-col flex-1 items-center"}>
                      <div className={"right"}>
                          <img className={"rounded-full w-96"} src={"https://media-exp1.licdn.com/dms/image/D4D03AQEz3ilY4wif3g/profile-displayphoto-shrink_800_800/0/1664888390515?e=1671062400&v=beta&t=ppmpY_sWU0SPhXhvZ4ZXBwtsg1JccwGvCf-XjTisP-0"}/>
                      </div>
                      <div className={"flex gap-2"}>
                          <a className={"flex flex-col gap-2 p-4 rounded-xl items-center border-white cursor-pointer"} href={"https://github.com/sebastiannordby"}>
                              <img className={"w-20"} src={githubLogo} />
                          </a>
                          <a className={"flex flex-col gap-2 p-4 rounded-xl items-center border-gray-50 cursor-pointer"} href={"https://www.linkedin.com/in/sebastian-nordby-b45087152/"}>
                              <img className={"w-20"} src={linkedinLogo}/>
                          </a>
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
            <div className="w-20 h-20">
                <div className="w-20">
                    <img src="/images/github.png"/>
                </div>
                <div className="w-20">
                    <img src="/images/linkedin.png"/>
                </div>
            </div>
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