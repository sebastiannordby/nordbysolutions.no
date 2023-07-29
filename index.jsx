import {createRoot} from "react-dom/client";
import { useState } from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { ContactPage } from "./pages/contact";
import { EducationPage } from "./pages/education";
import { HomePage } from "./pages/home";
import { WorkInfoPage, WorkPage } from "./pages/work";
import githubLogo from './images/github_icon.png';
import linkedinLogo from './images/linkedin_icon.png';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import {HOME_URL, EDUCATION_URL, WORK_URL, WORK_INFO_URL, CONTACT_URL, GITHUB_LINK, LINKED_IN_LINK} from './pages/constants'; 
const element = document.getElementById('app');
const root = createRoot(element);

const Application = () => {
    const [sideMenuVisible, setSideMenyVisible] = useState(false);

    const sideNavClass = () => {
        return `side-nav p-4 flex flex-col gap-2 shadow-lg h-full ${ sideMenuVisible ? 'block' : 'hidden'}`;
    };

    return (
        <BrowserRouter>
            <div className="flex w-full">
                <aside className={sideNavClass()}>
                    <div className="flex flex-col gap-2">
                        <Link to={HOME_URL}>
                            <span name="info" className="text-4xl material-symbols-outlined">home</span>
                        </Link>

                        {/* <label for="info">Meg</label> */}
                    </div>
                    <div>
                        <Link to={EDUCATION_URL}>
                            <span name="education" className="text-4xl material-symbols-outlined">school</span>
                        </Link>
                        {/* <label for="info">Utdanning</label> */}
                    </div> 
                    <div>
                        <Link to={WORK_URL}>
                            <span name="work" className="text-4xl material-symbols-outlined">apartment</span>
                        </Link>

                        {/* <label for="info">Erfaring</label> */}
                    </div>
                    <div>
                        <Link to={CONTACT_URL}>
                            <span name="contact" className="text-4xl material-symbols-outlined">contact_mail</span>
                        </Link>
                        {/* <label for="info">Kontakt</label> */}
                    </div>
                </aside>
                
                <div className="flex flex-col w-full">
                    <nav className="p-4 bg-white flex gap-2 justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <span 
                                className="text-2xl material-symbols-outlined hidden cursor-pointer sm:block"
                                onClick={() => setSideMenyVisible(!sideMenuVisible)}>menu</span>
                            <h1 className="text-xl font-bold">SebastianNordby.no</h1>
                        </div>
                        
                        <div className="flex gap-2">
                            <a href={GITHUB_LINK} target="_blank">
                                <img className="w-8" alt="Github logo" src={githubLogo}/> 
                            </a>
                            <a href={LINKED_IN_LINK} target="_blank">
                                <img className="w-8" alt="LinkedIn logo" src={linkedinLogo}/>
                            </a>
                        </div>
                    </nav>
                    <main className="flex-1 p-2">
                        <Routes>
                            <Route exact path="/linkedin" element={<LinkedInCallback/>} />
                            <Route path={HOME_URL} element={<HomePage/>}></Route>
                            <Route path={EDUCATION_URL} element={<EducationPage/>}></Route>
                            <Route path={WORK_URL} element={<WorkPage/>}></Route>
                            <Route path={WORK_INFO_URL} element={<WorkInfoPage/>}></Route>
                            <Route path={CONTACT_URL} element={<ContactPage/>}></Route>
                        </Routes>
                    </main>
                </div>
            </div>

        </BrowserRouter>
    );
};

root.render(<Application/>);