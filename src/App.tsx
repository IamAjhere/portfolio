import "./App.css";
import CustomCursor from "./components/Cursor/CustomCursor";
import GalaxyBackground from "./components/GalaxyBackground";
import Header from "./components/header";
import About from "./components/Sections/About";
import Contact from "./components/Sections/Contact";
import Projects from "./components/Sections/Projects";
import Skills from "./components/Sections/Skills";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

function App() {
  return (
    <div className={`relative w-full h-full`}>
      <CustomCursor />
      <Header name="Mohamed Ajmal" navLinks={navLinks} />
      <GalaxyBackground />
      <div className="absolute top-0 left-0 w-full h-full">
        <div id="about" className="h-screen">
          <About />
        </div>
        <div id="skills" className="h-screen">
          <Skills />
        </div>
        <div id="projects" className="h-screen">
          <Projects />
        </div>
        <div id="contact" className="h-screen">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
