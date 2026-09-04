import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SKILLSET_URL } from './constants';

const skills = [
  'C#',
  '.NET',
  'Blazor',
  'React',
  'TypeScript',
  'Angular',
  'SQL / T-SQL',
  'Azure',
  'Bicep',
  'gRPC',
  'Entity Framework',
  'Git',
  'Tailwind CSS',
  'Domain-Driven Design',
  'Clean Architecture',
  'WPF / WinUI',
];

const projects = [
  {
    key: 'sjekklista',
    url: 'https://sjekklista.no',
    tech: ['.NET', 'React', 'TypeScript', 'Azure'],
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto w-full px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">
            {t('hero.tagline')}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Sebastian Nordby
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed text-base">
            {t('hero.bio')}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:post@norso.no"
              className="px-5 py-2.5 text-sm font-medium border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              {t('hero.contact')}
            </a>
            <Link
              to={SKILLSET_URL}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              {t('hero.viewCv')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-20 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            {t('skills.header')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            {t('projects.title')}
          </h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <article
                key={project.key}
                className="p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`projects.${project.key}.name`)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  {t(`projects.${project.key}.description`)}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-800 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {t('projects.visit')} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
