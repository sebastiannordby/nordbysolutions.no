import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { ContactPage } from "./pages/contact";
import { EducationPage } from "./pages/education";
import { HomePage } from "./pages/home";
import { WorkPage } from "./pages/work";

const element = document.getElementById('app');
const root = createRoot(element);

const HOME_URL = '/';
const EDUCATION_URL = '/education';
const WORK_URL = '/work';
const CONTACT_URL = 'contact';

const Application = () => {
    return (
        <BrowserRouter>
            <div className="flex w-full">
                <aside className="p-4 flex flex-col gap-2 shadow-lg h-full">
                    <div className="flex flex-col gap-2">
                        <Link to={HOME_URL}>
                            <span name="info" class="text-4xl material-symbols-outlined">info</span>
                        </Link>

                        {/* <label for="info">Meg</label> */}
                    </div>
                    <div>
                        <Link to={EDUCATION_URL}>
                            <span name="education" class="text-4xl material-symbols-outlined">school</span>
                        </Link>
                        {/* <label for="info">Utdanning</label> */}
                    </div> 
                    <div>
                        <Link to={WORK_URL}>
                            <span name="work" class="text-4xl material-symbols-outlined">apartment</span>
                        </Link>

                        {/* <label for="info">Erfaring</label> */}
                    </div>
                    <div>
                        <Link to={CONTACT_URL}>
                            <span name="contact" class="text-4xl material-symbols-outlined">contact_mail</span>
                        </Link>
                        {/* <label for="info">Kontakt</label> */}
                    </div>
                </aside>
                
                <div className="flex flex-col w-full">
                    <nav className="p-4 bg-white">
                        <h1 className="text-xl font-bold">SebastianNordby.no</h1>
                    </nav>
                    <main className="flex-1 p-2">
                        <Routes>
                            <Route path={HOME_URL} element={<HomePage/>}></Route>
                            <Route path={EDUCATION_URL} element={<EducationPage/>}></Route>
                            <Route path={WORK_URL} element={<WorkPage/>}></Route>
                            <Route path={CONTACT_URL} element={<ContactPage/>}></Route>
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
};

root.render(<Application/>);