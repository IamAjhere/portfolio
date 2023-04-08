// Components/Sections/Projects.tsx
import React from "react";
import { IProfile, IRepository } from "../../Types/GitTypes";

interface ProjectsProps {
  repos: IRepository[] | null;
  login: IProfile["login"] | undefined | null;
}

function formatRepoName(name: string) {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
const Projects: React.FC<ProjectsProps> = ({ repos, login }) => {
  return (
    <div className="w-full h-full flex flex-wrap items-start justify-center text-black">
      {repos &&
        repos.map(
          (repo) =>
            repo.name.toLowerCase() !== login?.toLowerCase() && (
              <div
                key={repo.id}
                className="m-4 w-80 h-72 bg-white p-4 rounded shadow flex flex-col"
              >
                <div className="flex-grow">
                  <h2 className="font-bold text-lg mb-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatRepoName(repo.name)}
                    </a>
                  </h2>
                  <div className="text-gray-700 h-12">
                    <p className="">{repo.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">{repo.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 mr-2">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="text-gray-600">🍴 {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default Projects;
