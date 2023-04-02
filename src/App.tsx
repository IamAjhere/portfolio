import { Canvas } from "@react-three/fiber";
import "./App.css";
import Galaxy from "./components/3D/Galaxy";
import CustomCursor from "./components/Cursor/CustomCursor";
import Header from "./components/header";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function App() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Header name="Mohamed Ajmal" navLinks={navLinks} />
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: "black" }}
      >
        <Galaxy />
      </Canvas>
      <CustomCursor />
    </div>
  );
}

export default App;
