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
import { IProfile, IRepository } from "./Types/GitTypes";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];
function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [repos, setRepos] = useState<IRepository[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          axios.get("https://api.github.com/users/IamAjHere"),
          axios.get("https://api.github.com/users/IamAjHere/repos"),
        ]);
        console.log(profileResponse);
        setProfile(profileResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(profile);
  return (
    <div className="relative w-full h-full">
      <CustomCursor />
      <Header name={`${profile?.name}`} navLinks={navLinks} />
      <GalaxyBackground />
      <div className="flex flex-col items-stretch h-full pt-12 z-20">
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
