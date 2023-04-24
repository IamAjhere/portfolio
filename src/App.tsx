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
} from "./constants";
import LoadingSpinner from "./components/LoadingSpinner";
import gearIcon from "./assets/gear-icon.png";
import gitIcon from "./assets/git-Icon.png";
import maleuserIcon from "./assets/maleuser-icon.png";
import messageIcon from "./assets/message-icon.png";

const navLinks = [
  {
    label: "About",
    href: "about",
    icon: maleuserIcon,
  },
  {
    label: "Projects",
    href: "projects",
    icon: gitIcon,
  },
  {
    label: "Skills",
    href: "skills",
    icon: gearIcon,
  },
  {
    label: "Contact",
    href: "contact",
    icon: messageIcon,
  },
];
function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [repos, setRepos] = useState<IRepository[] | null>(null);
  const [leetCodeSkills, setLeetCodeSkills] = useState<ILeetSkills | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCalls = [
          axios.get(GITHUB_USER_API_URL),
          axios.get(GITHUB_USER_API_URL + "/repos"),
          axios.get(STATIC_DATA_RAW),
        ];
        if (process.env.NODE_ENV !== "development") {
          apiCalls.push(axios.get(YOUR_NETLIFY_FUNCTION_URL));
        }

        const [
          profileResponse,
          reposResponse,
          portfolioDataResponse,
          leetCodeSkill,
        ] = await Promise.all(apiCalls);

        const combinedProfileData: IProfile = {
          ...profileResponse.data,
          portfolioData: portfolioDataResponse.data,
        };

        if (leetCodeSkill) {
          setLeetCodeSkills(leetCodeSkill.data);
        }

        setRepos(reposResponse.data);
        setProfile(combinedProfileData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="relative w-full h-full">
      <CustomCursor />
      <Header name={`${profile?.name}`} navLinks={navLinks} />
      <GalaxyBackground />
      <div className="flex flex-col items-stretch h-full z-20 mb-32 ">
        <div className="container mx-auto px-4 flex-grow">
          <div id="about" className="min-h-screen md:h-screen  ">
            <About profile={profile} />
          </div>
          <div id="projects" className="min-h-screen md:h-screen ">
            <Projects repos={repos} login={profile?.login} />
          </div>
          <div id="skills" className="min-h-screen md:h-screen  ">
            <Skills profile={profile} leetSkills={leetCodeSkills} />
          </div>
          <div id="contact" className="min-h-screen md:h-screen  ">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
