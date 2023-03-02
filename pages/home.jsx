import { useEffect, useState } from 'react';
import DALL_E_2_HACKER_IMG from '../images/painting_hacker_dall_e_2.png';

const fetchGithubRepositories = async () => {
    const result = await fetch('https://api.github.com/users/sebastiannordby/repos');
    return await result.json();
}

export function HomePage() {
    return (
        <div className={"front-page flex flex-col h-full w-full h-auto p-4 home gap-4"}>

            <section className="p-4 flex gap-4 items-center bg-dall-e flex-wrap mx-auto w-full"
                style={{
                    maxWidth: '800px'
                }}>
                <div className="mx-auto" style={{
                    maxWidth: '350px'
                }}>
                    <h2 
                        style={{
                            color: "var(--light-white)"
                        }}
                        className={"text-2xl border-b border-slate-200 pb-2border-b border-slate-200 mb-2 pb-2"}>Hei! Mitt navn er <strong>Sebastian Nordby</strong>.</h2>
                    <p>
                        Jeg er en <strong>fullstack utvikler</strong> med 5+ års erfaring. Programmering er min lidenskap og jeg begynte allerede med dette 
                        da jeg fortsatt tok grunnskole. Videre har jeg fortsatt med lidenskapen og jobber i dag fulltid med programmering.
                    </p>
                </div>
                <img src={DALL_E_2_HACKER_IMG} className="mx-auto w-96 ml-auto" style={{ maxWidth: '300px'}} />
            </section>

            <GithubRepositoriesSection/>
        </div>
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
        <section className="p-4 flex flex-col gap-4 bg-purple-300 mx-auto w-full h-80"
            style={{
                maxWidth: '800px'
            }}>
            <h3 class="text-xl">Github - prosjekter</h3>

            <div className="flex flex-wrap gap-2 h-full overflow-y-auto">
                {(
                    loading ? 
                    <span>Laster..</span> :  <GithubRepoShowcase githubRepos={githubRepos} />
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