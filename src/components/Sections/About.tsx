import React from "react";

interface AboutProps {
  profile: IProfile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
      <div className="rounded-full overflow-hidden w-32 h-32 mb-8">
        <img
          src={profile?.avatar_url}
          alt={profile?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-4xl sm:text-6xl font-bold text-center text-white mb-4">
        Hi, I am {profile?.name}
      </h1>
      <p className="text-base sm:text-xl text-center text-white mx-8 mb-4">
        {profile?.bio}
      </p>
      <p className="text-sm sm:text-lg text-center text-white mx-8">
        Driven by a passion for technology and a commitment to excellence, I
        strive to create innovative solutions that positively impact the world,
        while inviting visitors to explore my portfolio to witness the fusion of
        creativity and technical expertise.
      </p>
    </div>
  );
};

export default About;
