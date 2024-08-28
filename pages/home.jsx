import { useEffect, useState } from 'react';
import DALL_E_2_HACKER_IMG from '../images/painting_hacker_dall_e_2.png';
import DALL_E_3_SKILLS_IMG from '../images/skills.jpg';

const fetchGithubRepositories = async () => {
    const result = await fetch('https://api.github.com/users/sebastiannordby/repos');
    return await result.json();
}

export function HomePage() {
    return (
        <div className={"front-page flex flex-col w-full h-auto p-4 home gap-4"}>
            <IntroductionSection />
            <SkillShowcase />
            <GithubRepositoriesSection/>
        </div>
    );
}

export function IntroductionSection() {
    return (
        <section className="p-4 flex gap-4 items-center bg-dall-e flex-wrap mx-auto w-full rounded-lg shadow-md"
            style={{
                maxWidth: '800px'
            }}>
            <div className="mx-auto" style={{
                maxWidth: '350px'
            }}>
                <h2
                    className={"text-2xl border-b border-slate-200 pb-2border-b mb-2 pb-2"}>
                    Welcome to <strong>Nordby Solutions</strong>.
                </h2>
                <p>
                    Nordby Solutions is dedicated to developing user-friendly and efficient solutions. We create applications that truly meet users' <strong>needs</strong> and make a <strong>difference</strong>. Our team of skilled developers continually works on delivering innovative and reliable products that help our customers achieve their goals.
                </p>
            </div>
            <img src={DALL_E_2_HACKER_IMG} className="mx-auto w-96 ml-auto" style={{ maxWidth: '300px'}} />
        </section>
    );
}

export function GithubRepositoriesSection() {
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            setLoading(true);
            setGithubRepos(await fetchGithubRepositories());
            setLoading(false);
        })();
    }, []);

    return (
        <section className="p-4 flex flex-col gap-4 shadow-2xl mx-auto w-full h-80  rounded-lg bg-dall-e"
            style={{
                maxWidth: '800px'
            }}>
            <h3 class="text-xl">GitHub - Projects</h3>

            <div className="flex flex-wrap gap-2 h-full overflow-y-auto">
                {(
                    loading ? 
                    <span>Loading..</span> :  <GithubRepoShowcase githubRepos={githubRepos} />
                )}
            </div>
        </section>
    );
}

function GithubRepoShowcase({ githubRepos }) {
    return (
        githubRepos.map(x => 
            <a className="cursor-pointer hover:underline basis-60 p-2" href={x.html_url} target="_blank">
                <span>{x.name}</span>
            </a>
        )
    );
}

function SkillShowcase() {
    return (
        <section className="flex flex-wrap mx-auto w-full rounded-lg bg-white overflow-hidden shadow-md"
            style={{
                maxWidth: '800px'
            }}>

            <img src={DALL_E_3_SKILLS_IMG} className="h-full hidden md:block max-h-80"/>

            <div className="p-4 flex flex-col gap-4 flex-1">
                <h3 class="text-xl">Skills</h3>

                <div className="flex flex-wrap gap-2 h-full overflow-y-auto justify-evenly text-center">
                    <div className="p-2">
                        <h4 className="text-l mb-2 underline">Languages/Markup/Script</h4>
                        <ul>
                            <li>C#</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>Javascript</li>
                            <li>Typescript</li>
                            <li>XML/JSON/XSLT</li>
                        </ul>
                    </div>

                    <div className="p-2">
                        <h4 className="text-l mb-2 underline">Frameworks/Tools</h4>
                        <ul>
                            <li>Blazor</li>
                            <li>React</li>
                            <li>Angular</li>
                            <li>.NET</li>
                            <li>EntityFramework(EF)</li>
                            <li>Git</li>      
                            <li>Tailwind</li>      
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
