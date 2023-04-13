import React, { useState } from "react";
import { ILeetSkills, IProfile, ISkill } from "../../Types/GitTypes";

interface StaticSkillCategoryProps {
  categoryTitle: string;
  skills: string[];
  isOpen: boolean;
  handleToggleSkills: (categoryTitle: string) => void;
}

interface SkillCategoryProps {
  categoryTitle: string;
  skills: ISkill[];
  isOpen: boolean;
  handleToggleSkills: (categoryTitle: string) => void;
}

interface SkillsProps {
  profile: IProfile | null;
  leetSkills: ILeetSkills;
}

const StaticSkillCategory: React.FC<StaticSkillCategoryProps> = ({
  categoryTitle,
  skills,
  isOpen,
  handleToggleSkills,
}) => {
  return (
    <div className="mt-4">
      <div
        className="flex items-center text-sm font-medium mb-2 nav-link select-none"
        onClick={() => handleToggleSkills(categoryTitle)}
      >
        <span
          className={`transform inline-block mr-2 ${
            isOpen ? "rotate-90" : "rotate-0"
          } transition-all duration-200`}
        >
          ▶
        </span>
        <span>
          {categoryTitle
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </div>
      <div
        className={`flex flex-wrap overflow-y-auto ${
          isOpen ? "max-h-2rows" : "max-h-0"
        }`}
      >
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center text-xs my-2 mr-2 select-none"
          >
            <span className="inline-block">
              <span className="inline-flex items-center px-2 py-1 whitespace-nowrap leading-6 rounded-full bg-white text-black transition-all duration-200 hover:bg-gray-100">
                {skill}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillCategory: React.FC<SkillCategoryProps> = ({
  categoryTitle,
  skills,
  isOpen,
  handleToggleSkills,
}) => {
  return (
    <div className="mt-4">
      <div
        className="flex items-center text-sm font-medium mb-2 nav-link select-none"
        onClick={() => handleToggleSkills(categoryTitle)}
      >
        <span
          className={`transform inline-block mr-2 ${
            isOpen ? "rotate-90" : "rotate-0"
          } transition-all duration-200`}
        >
          ▶
        </span>
        <span>{categoryTitle}</span>
      </div>
      <div
        className={`flex flex-wrap overflow-y-auto ${
          isOpen ? "max-h-2rows" : "max-h-0"
        }`}
      >
        {skills.map((skill) => (
          <div
            key={skill.tagName}
            className="flex items-center text-xs my-2 mr-2 select-none"
          >
            <span className="inline-block">
              <span className="inline-flex items-center px-2 py-1 whitespace-nowrap leading-6 rounded-full bg-white text-black transition-all duration-200 hover:bg-gray-100">
                {skill.tagName}
              </span>
            </span>
            <span className="text-xs text-gray-400 ml-2">{`x${skill.problemsSolved}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ profile, leetSkills }) => {
  const [openCategory, setOpenCategory] = useState("");

  const handleToggleSkills = (categoryTitle: string) => {
    if (openCategory === categoryTitle) {
      setOpenCategory("");
    } else {
      setOpenCategory(categoryTitle);
    }
  };

  return (
    <div className="min-h-screen flex-grow">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl mt-1 sm:mt-1 sm:text-6xl font-bold text-center text-white mb-4">
          Skills
        </h1>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-black rounded-lg p-6 border border-white shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold sm:mb-4 text-center  text-white">
              Leet Coding Skills
            </h2>
            <div className="sm:mt-8 w-full max-w-3xl mx-auto flex-grow  text-white">
              <SkillCategory
                categoryTitle="Advanced"
                skills={leetSkills.advanced}
                isOpen={openCategory === "Advanced"}
                handleToggleSkills={handleToggleSkills}
              />
              <SkillCategory
                categoryTitle="Intermediate"
                skills={leetSkills.intermediate}
                isOpen={openCategory === "Intermediate"}
                handleToggleSkills={handleToggleSkills}
              />
              <SkillCategory
                categoryTitle="Fundamental"
                skills={leetSkills.fundamental}
                isOpen={openCategory === "Fundamental"}
                handleToggleSkills={handleToggleSkills}
              />
            </div>
          </div>
          <div className="bg-black rounded-lg p-6 border border-white shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Overall Skills
            </h2>
            <div className="sm:mt-8 w-full max-w-3xl mx-auto flex-grow text-white">
              {profile &&
                Object.entries(profile.portfolioData.skills).map(
                  ([categoryTitle, skills]) => (
                    <StaticSkillCategory
                      key={categoryTitle}
                      categoryTitle={categoryTitle}
                      skills={skills}
                      isOpen={openCategory === categoryTitle}
                      handleToggleSkills={handleToggleSkills}
                    />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
