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

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];
function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/IamAjHere"
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(profile);
  return (
    <div className={`relative w-full h-full`}>
      <CustomCursor />
      <Header name={`${profile?.name}`} navLinks={navLinks} />
      <GalaxyBackground />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="container mx-auto px-4">
          <div
            id="about"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <About profile={profile} />
          </div>
          <div
            id="skills"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <Skills />
          </div>
          <div
            id="projects"
            className="h-screen border-l-2 border-r-2 border-white"
          >
            <Projects />
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
