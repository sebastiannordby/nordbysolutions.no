import DALL_E_2_HACKER_IMG from '../images/painting_hacker_dall_e_2.png';
import React from 'react'; // Import React

export function HomePage() {
    return (
        <div className="flex flex-col w-full h-auto p-4 gap-4">
            <IntroductionSection />
            <SkillShowcase />
        </div>
    );
}

export function IntroductionSection() {
    return (
        <section className="p-6 flex flex-col md:flex-row gap-6 items-center bg-white rounded-lg shadow-md mx-auto max-w-3xl">
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">
                    Welcome to <strong>Nordby Solutions</strong>.
                </h2>
                <p className="text-gray-700">
                    Nordby Solutions is committed to crafting <strong>user-friendly</strong> and <strong>efficient</strong> solutions. I focus on developing applications that genuinely meet users' needs and make a meaningful impact. As a solo developer, I am dedicated to delivering innovative and reliable products that help my clients achieve their goals. My work is characterized by a personal touch and a deep commitment to <strong>quality</strong> and <strong>user satisfaction</strong>.
                </p>
            </div>
            <img src={DALL_E_2_HACKER_IMG} alt="Tech illustration" className="w-full md:w-80 h-auto rounded-md shadow-md" />
        </section>
    );
}

// export function GithubRepositoriesSection() {
//     const [githubRepos, setGithubRepos] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         (async () => {
//             setLoading(true);
//             setGithubRepos(await fetchGithubRepositories());
//             setLoading(false);
//         })();
//     }, []);

//     return (
//         <section className="p-6 bg-white rounded-lg shadow-md mx-auto max-w-3xl">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">GitHub - Projects</h3>

//             <div className="flex flex-wrap gap-2">
//                 {loading ? (
//                     <span className="text-gray-500">Loading...</span>
//                 ) : (
//                     <GithubRepoShowcase githubRepos={githubRepos} />
//                 )}
//             </div>
//         </section>
//     );
// }

// function GithubRepoShowcase({ githubRepos }) {
//     return (
//         <div className="w-full flex flex-wrap gap-2">
//             {githubRepos.map((repo) => (
//                 <a
//                     key={repo.id}
//                     className="flex-shrink-0 flex-grow sm:flex-grow-0 w-full sm:w-48 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors overflow-hidden"
//                     href={repo.html_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ minWidth: 0 }} // Ensures no item grows beyond the container width
//                 >
//                     <span className="block text-lg font-semibold truncate">{repo.name}</span>
//                 </a>
//             ))}
//         </div>
//     );
// }

function SkillShowcase() {
    return (
        <section className="flex flex-col md:flex-row mx-auto w-full max-w-3xl rounded-lg bg-white shadow-md overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="p-6 flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-gray-900">Skills & Expertise</h3>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b-2 border-gray-300">Languages & Technologies</h4>
                        <ul className="list-disc list-inside text-gray-700">
                            <li><strong>C#</strong> - Experienced in backend development with .NET framework.</li>
                            <li><strong>HTML</strong> - Expertise in structuring and organizing web content.</li>
                            <li><strong>CSS</strong> - Proficient in styling and responsive design techniques.</li>
                            <li><strong>JavaScript/Typescript</strong> - Skilled in creating interactive web applications.</li>
                            <li><strong>SQL/TSQL</strong> - Proficient in querying and managing relational databases.</li>
                            <li><strong>XML/JSON/XSLT</strong> - Handling and transforming data formats efficiently.</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b-2 border-gray-300">Frameworks & Tools</h4>
                        <ul className="list-disc list-inside text-gray-700">
                            <li><strong>Blazor</strong> - Building interactive web UIs with C# instead of JavaScript.</li>
                            <li><strong>React</strong> - Creating dynamic user interfaces with component-based architecture.</li>
                            <li><strong>Angular</strong> - Developing robust single-page applications.</li>
                            <li><strong>.NET</strong> - Comprehensive framework for building diverse applications.</li>
                            <li><strong>Entity Framework (EF)</strong> - ORM tool for working with databases in .NET applications.</li>
                            <li><strong>Git</strong> - Version control for managing code and collaboration.</li>
                            <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for rapid UI development.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
