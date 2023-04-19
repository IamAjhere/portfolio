// Components/Sections/Projects.tsx
import React from "react";
import { IProfile, IRepository } from "../../Types/GitTypes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import githubIcon from "../../assets/github icon.png";
import linkIcon from "../../assets/link-icon.png";
import starIcon from "../../assets/star-icon.png";
import forkIcon from "../../assets/fork-icon.png";

interface ProjectsProps {
  repos: IRepository[] | null;
  login: IProfile["login"] | undefined | null;
}

interface RepoCardProps {
  repo: IRepository;
  formatRepoName: (name: string) => string;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, formatRepoName }) => (
  <div
    className="m-4 w-80 h-96 sm:w-80 sm:h-72 p-4 rounded-lg shadow custom-shadow flex flex-col"
    style={{
      background: "rgba(0, 0, 0, 0.7)",
      border: "2px solid white",
      color: "white",
      backdropFilter: "blur(10px)",
    }}
  >
    <div className="flex-grow">
      <h2 className="font-bold text-l mb-2">{formatRepoName(repo.name)}</h2>
      <div className="text-gray-100 h-12 mb-4">
        <p className="">{repo.description}</p>
      </div>
    </div>
    <div className="mt-4 mb-2 flex items-center">
      <button
        onClick={() => window.open(repo.html_url, "_blank")}
        className="text-xs custom-shadow-hover cursor-none sm:text-sm text-white bg-transparent border border-white rounded px-2 py-1 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "1em",
            height: "1em",
            background: "white",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={githubIcon}
            alt="GitHub Icon"
            style={{
              width: "1em",
              height: "1em",
            }}
          />
        </div>
        <span style={{ marginLeft: "0.5em" }}>Source</span>
      </button>

      {repo.homepage && (
        <button
          onClick={() => window.open(repo.homepage, "_blank")}
          className="text-xs cursor-none sm:text-sm text-black bg-white border border-white rounded px-2 py-1 mr-2 transition duration-300 ease-in-out transform hover:scale-105"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={linkIcon}
            alt="Link Icon"
            style={{
              width: "1em",
              height: "1em",
              marginRight: "0.5em",
            }}
          />
          Website
        </button>
      )}
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-300 mr-2">{repo.language}</span>
      <div className="flex items-center">
        <img
          src={starIcon}
          alt="Star Icon"
          style={{
            width: "1em",
            height: "1em",
            marginRight: "0.5em",
            filter: "invert(1)",
          }}
        />
        <span className="text-gray-300 mr-2">{repo.stargazers_count}</span>
        <img
          src={forkIcon}
          alt="Fork Icon"
          style={{
            width: "1em",
            height: "1em",
            marginRight: "0.5em",
            filter: "invert(1)",
          }}
        />
        <span className="text-gray-300">{repo.forks_count}</span>
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
const chunk = (array: any[], size: number) => {
  const chunkedArr = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};

const Projects: React.FC<ProjectsProps> = ({ repos, login }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const repoCards = repos
    ? repos
        .filter((repo) => repo.name.toLowerCase() !== login?.toLowerCase())
        .map((repo) => (
          <RepoCard key={repo.id} repo={repo} formatRepoName={formatRepoName} />
        ))
    : [];

  const repoCardsChunks = chunk(repoCards, isMobile ? 1 : 6);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-black px-2 py-2 ">
      <h1 className="text-4xl mt-1 sm:mt-1 sm:text-6xl font-bold text-center text-white mb-4">
        Projects
      </h1>
      <div className="w-full flex flex-wrap items-center justify-center">
        <Carousel
          showArrows={false}
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          className="w-full"
          autoPlay
          interval={isMobile ? 4000 : 8000}
        >
          {repoCardsChunks.map((chunk, index) => (
            <div key={index} className="flex flex-wrap justify-center">
              {chunk}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Projects;
