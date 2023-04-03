import { Canvas } from "@react-three/fiber";
import "./App.css";
import Galaxy from "./components/3D/Galaxy";
import CustomCursor from "./components/Cursor/CustomCursor";
import Header from "./components/header";
import About from "./components/Sections/About";
import Skills from "./components/Sections/Skills";
import Projects from "./components/Sections/Projects";
import Contact from "./components/Sections/Contact";
import { useEffect, useRef, useState } from "react";
import GalaxyBackground from "./components/GalaxyBackground";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState(1);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.id.replace("section-", "")));
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(aboutRef.current!);
    observer.observe(skillsRef.current!);
    observer.observe(projectsRef.current!);
    observer.observe(contactRef.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <CustomCursor />
      <Header name="Mohamed Ajmal" navLinks={navLinks} />
      <GalaxyBackground activeSection={activeSection} />
      <div className="absolute top-0 left-0 w-full h-full">
        <div id="about" ref={aboutRef} className="h-screen">
          <About />
        </div>
        <div id="skills" ref={skillsRef} className="h-screen">
          <Skills />
        </div>
        <div id="projects" ref={projectsRef} className="h-screen">
          <Projects />
        </div>
        <div id="contact" ref={contactRef} className="h-screen">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
