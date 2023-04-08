// Components/Sections/Projects.tsx
import React from "react";
import { IProfile, IRepository } from "../../Types/GitTypes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";

interface ProjectsProps {
  repos: IRepository[] | null;
  login: IProfile["login"] | undefined | null;
}

interface RepoCardProps {
  repo: IRepository;
  formatRepoName: (name: string) => string;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, formatRepoName }) => (
  <div className="m-4 w-80 h-72 bg-white p-4 rounded shadow flex flex-col">
    <div className="flex-grow">
      <h2 className="font-bold text-lg mb-2">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
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
        <span className="text-gray-600 mr-2">⭐ {repo.stargazers_count}</span>
        <span className="text-gray-600">🍴 {repo.forks_count}</span>
      </div>
    </div>
  </div>
);

function formatRepoName(name: string) {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Projects: React.FC<ProjectsProps> = ({ repos, login }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const repoCards = repos
    ? repos
        .filter((repo) => repo.name.toLowerCase() !== login?.toLowerCase())
        .map((repo) => (
          <RepoCard key={repo.id} repo={repo} formatRepoName={formatRepoName} />
        ))
    : [];

  return (
    <div className="w-full h-full flex flex-wrap items-start justify-center text-black">
      {isMobile ? (
        <Carousel
          showArrows
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          className="w-full"
        >
          {repoCards}
        </Carousel>
      ) : (
        <>{repoCards}</>
      )}
    </div>
  );
};

export default Projects;
