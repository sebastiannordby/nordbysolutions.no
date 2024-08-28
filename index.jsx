import {createRoot} from "react-dom/client";
import { useState } from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { ContactPage } from "./pages/contact";
import { EducationPage } from "./pages/education";
import { HomePage } from "./pages/home";
import { WorkInfoPage, WorkPage } from "./pages/work";
import { PrivacyPage } from "./pages/privacy";
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import {HOME_URL, EDUCATION_URL, WORK_URL, WORK_INFO_URL, CONTACT_URL, GITHUB_LINK, LINKED_IN_LINK, PRIVACY_URL} from './pages/constants'; 
const element = document.getElementById('app');
const root = createRoot(element);

const Application = () => {
    const [sideMenuVisible, setSideMenyVisible] = useState(false);

    const sideNavClass = () => {
        return `side-nav p-4 flex flex-col gap-2 shadow-lg h-full ${ sideMenuVisible ? 'block' : 'hidden'}`;
    };

    return (
        <BrowserRouter>
            <div className="flex flex-col w-full h-screen">                
                <div className="flex flex-col w-full flex-1  overflow-hidden">
                    <nav className="p-4 flex gap-2 justify-between items-center">
                        <div className="flex gap-2 items-center">
                            {/* <span 
                                className="text-2xl material-symbols-outlined hidden cursor-pointer sm:block"
                                onClick={() => setSideMenyVisible(!sideMenuVisible)}>menu</span> */}
                            <Link to={'/'}>
                                <h1 className="text-2xl font-bold">Nordby Solutions</h1>
                            </Link>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                            <Link to={PRIVACY_URL}>Privacy</Link>
                            <a href="{GITHUB_LINK}" target="_blank">Github</a>
                            <a href="{LINKED_IN_LINK}" target="_blank">LinkedIn</a>
                        </div>
                    </nav>
                    <main className="flex-1 p-2 overflow-auto">
                        <Routes>
                            <Route exact path="/linkedin" element={<LinkedInCallback/>} />
                            <Route path={HOME_URL} element={<HomePage/>}></Route>
                            <Route path={EDUCATION_URL} element={<EducationPage/>}></Route>
                            <Route path={WORK_URL} element={<WorkPage/>}></Route>
                            <Route path={WORK_INFO_URL} element={<WorkInfoPage/>}></Route>
                            <Route path={CONTACT_URL} element={<ContactPage/>}></Route>
                            <Route path={PRIVACY_URL} element={<PrivacyPage/>}></Route>
                        </Routes>
                    </main>
                </div>
                <footer className="p-2 text-center">© NordbySolutions - 2024</footer>
            </div>
        </BrowserRouter>
    );
};

root.render(<Application/>);
