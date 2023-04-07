// Components/Sections/Projects.tsx
import React from "react";
import { IRepository } from "../../Types/GitTypes";

interface ProjectsProps {
  repos: IRepository[] | null;
}

const Projects: React.FC<ProjectsProps> = ({ repos }) => {
  return (
    <div className="w-full h-full flex flex-wrap items-start justify-center">
      {repos &&
        repos.map((repo) => (
          <div key={repo.id} className="m-4 w-80 bg-white p-4 rounded shadow">
            <h2 className="font-bold text-xl mb-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h2>
            <p className="text-gray-700">{repo.description}</p>
            <div className="mt-4 flex justify-between">
              <span className="text-gray-600">{repo.language}</span>
              <div>
                <span className="text-gray-600 mr-2">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="text-gray-600">🍴 {repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Projects;
