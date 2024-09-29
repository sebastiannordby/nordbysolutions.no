# Welcome to nordbysolutions.no

This is the repository for my website 💻

Hope you enjoy your stay 🧙




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
