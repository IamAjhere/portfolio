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
import { IProfile, IRepository, PortfolioData } from "./Types/GitTypes";

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
        const [profileResponse, reposResponse, portfolioDataResponse] =
          await Promise.all([
            axios.get("https://api.github.com/users/IamAjHere"),
            axios.get("https://api.github.com/users/IamAjHere/repos"),
            axios.get(
              "https://raw.githubusercontent.com/IamAjhere/IamAjHere/main/portfoliodata.json"
            ),
          ]);
        const combinedProfileData: IProfile = {
          ...profileResponse.data,
          portfolioData: portfolioDataResponse.data,
        };
        setProfile(combinedProfileData);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <div
            id="skills"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <Skills />
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
