import { useEffect, useState } from "react";
import "./App.css";
import CustomCursor from "./components/Cursor/CustomCursor";
import GalaxyBackground from "./components/GalaxyBackground";
import Header from "./components/header";
import About from "./components/Sections/About";
import Contact from "./components/Sections/Contact";
import Projects from "./components/Sections/Projects";
import Skills from "./components/Sections/Skills";
import axios from "axios";
import { ILeetSkills, IProfile, IRepository } from "./Types/GitTypes";

const navLinks = [
  {
    label: "About",
    href: "about",
    icon: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
  },
  {
    label: "Projects",
    href: "projects",
    icon: "https://img.icons8.com/ios-filled/50/null/git.png",
  },
  {
    label: "Skills",
    href: "skills",
    icon: "https://img.icons8.com/ios-filled/50/null/gear.png",
  },
  {
    label: "Contact",
    href: "contact",
    icon: "https://img.icons8.com/android/24/null/filled-message.png",
  },
];
function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [repos, setRepos] = useState<IRepository[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localProfile = localStorage.getItem("profile");
        const localRepos = localStorage.getItem("repos");

        if (localProfile && localRepos) {
          setProfile(JSON.parse(localProfile));
          setRepos(JSON.parse(localRepos));
        }

        const [profileResponse, reposResponse, portfolioDataResponse] =
          await Promise.all([
            axios.get("https://api.github.com/users/IamAjHere"),
            axios.get("https://api.github.com/users/IamAjHere/repos"),
            axios.get(
              "https://raw.githubusercontent.com/IamAjhere/IamAjHere/main/portfoliodata.json"
            ),
          ]);

        const combinedProfileData = {
          ...profileResponse.data,
          portfolioData: portfolioDataResponse.data,
        };

        if (
          !localProfile ||
          JSON.stringify(localProfile) !== JSON.stringify(combinedProfileData)
        ) {
          localStorage.setItem("profile", JSON.stringify(combinedProfileData));
          setProfile(combinedProfileData);
        }

        if (
          !localRepos ||
          JSON.stringify(localRepos) !== JSON.stringify(reposResponse.data)
        ) {
          localStorage.setItem("repos", JSON.stringify(reposResponse.data));
          setRepos(reposResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const leetSkills: ILeetSkills = {
    advanced: [
      {
        tagName: "Backtracking",
        problemsSolved: 1,
      },
      {
        tagName: "Dynamic Programming",
        problemsSolved: 3,
      },
      {
        tagName: "Divide and Conquer",
        problemsSolved: 1,
      },
      {
        tagName: "Union Find",
        problemsSolved: 1,
      },
    ],
    intermediate: [
      {
        tagName: "Tree",
        problemsSolved: 2,
      },
      {
        tagName: "Binary Tree",
        problemsSolved: 2,
      },
      {
        tagName: "Hash Table",
        problemsSolved: 4,
      },
      {
        tagName: "Graph",
        problemsSolved: 1,
      },
      {
        tagName: "Binary Search",
        problemsSolved: 5,
      },
      {
        tagName: "Depth-First Search",
        problemsSolved: 5,
      },
      {
        tagName: "Breadth-First Search",
        problemsSolved: 6,
      },
      {
        tagName: "Recursion",
        problemsSolved: 1,
      },
      {
        tagName: "Sliding Window",
        problemsSolved: 2,
      },
      {
        tagName: "Math",
        problemsSolved: 4,
      },
    ],
    fundamental: [
      {
        tagName: "Array",
        problemsSolved: 11,
      },
      {
        tagName: "Matrix",
        problemsSolved: 3,
      },
      {
        tagName: "String",
        problemsSolved: 6,
      },
      {
        tagName: "Sorting",
        problemsSolved: 1,
      },
      {
        tagName: "Linked List",
        problemsSolved: 4,
      },
      {
        tagName: "Two Pointers",
        problemsSolved: 9,
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      <CustomCursor />
      <Header name={`${profile?.name}`} navLinks={navLinks} />
      <GalaxyBackground />
      <div className="flex flex-col items-stretch h-full z-20 ">
        <div className="container mx-auto px-4 flex-grow">
          <div
            id="about"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <About profile={profile} />
          </div>
          <div
            id="projects"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <Projects repos={repos} login={profile?.login} />
          </div>
          <div id="skills" className=" border-l-2 border-r-2 border-white ">
            <Skills profile={profile} leetSkills={leetSkills} />
          </div>
          <div
            id="contact"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
