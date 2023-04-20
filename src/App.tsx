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
import { IProfile, IRepository, ILeetSkills } from "./Types/GitTypes";
import {
  GITHUB_USER_API_URL,
  STATIC_DATA_RAW,
  YOUR_NETLIFY_FUNCTION_URL,
} from "../constants";

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
  const [leetCodeSkills, setLeetCodeSkills] = useState<ILeetSkills | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileResponse,
          reposResponse,
          portfolioDataResponse,
          leetCodeSkill,
        ] = await Promise.all([
          axios.get(GITHUB_USER_API_URL),
          axios.get(GITHUB_USER_API_URL + "/repos"),
          axios.get(STATIC_DATA_RAW),
          axios.get(YOUR_NETLIFY_FUNCTION_URL),
        ]);

        const combinedProfileData: IProfile = {
          ...profileResponse.data,
          portfolioData: portfolioDataResponse.data,
        };

        setLeetCodeSkills(leetCodeSkill.data);
        setRepos(reposResponse.data);
        setProfile(combinedProfileData);
        console.log(leetCodeSkills);
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
      <div className="flex flex-col items-stretch h-full z-20 mb-32 ">
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
