import React from "react";
import { IProfile } from "../../Types/GitTypes";

interface AboutProps {
  profile: IProfile | null;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center sm:p-4 sm:mt-[-32]">
      <div className="rounded-full overflow-hidden w-48 h-48 ">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl sm:text-6xl font-bold text-center text-white mb-4">
        Hello! I'm {profile.name}
      </h1>
      <p className="text-lg sm:text-xl text-center text-white mx-4 sm:mx-8 mb-4">
        Full Stack Engineer & Cloud Computing Enthusiast
      </p>
      <div
        className="bg-black rounded-lg p-4 sm:p-10 mx-4 sm:mx-32  shadow-lg text-sm sm:text-lg text-center text-white"
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          border: "1px solid white",
          color: "white",
          backdropFilter: "blur(10px)",
        }}
      >
        A full stack software engineer from Anuradhapura, Sri Lanka, proficient
        in MERN stack and AWS. Committed to staying up-to-date and ensuring
        secure, efficient solutions. Discover my work, skills, and achievements
        on this website. Let's create extraordinary projects together!
      </div>
    </div>
  );
};

export default About;
