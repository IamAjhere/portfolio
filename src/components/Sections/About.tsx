import React from 'react';
import { IProfile } from '../../Types/GitTypes';

interface AboutProps {
  profile: IProfile | null;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className='w-full h-full flex flex-col pt-10 items-center justify-center sm:p-4 sm:mt-[-32]'>
      <div
        className='rounded-full overflow-hidden w-48 h-48'
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid white',
          color: 'white',
          backdropFilter: 'blur(10px)',
        }}
      >
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className='w-full h-full object-cover'
        />
      </div>
      <h1 className='text-4xl sm:text-6xl font-bold text-center text-white mb-4'>
        {"Hello! I'm ".split('').map((letter, index) => (
          <span key={`hello-${index}`} className='letter-stroke'>
            {letter}
          </span>
        ))}
        {profile.name.split('').map((letter, index) => (
          <span key={index} className='letter-stroke'>
            {letter}
          </span>
        ))}
      </h1>
      <p className='text-lg sm:text-xl text-center text-white mx-4 sm:mx-8 mb-4'>
        {profile.portfolioData.about.job_title}
      </p>
      <div
        className='bg-black rounded-lg p-4 sm:p-10 mx-4 sm:mx-32 custom-shadow  shadow-lg text-sm sm:text-lg text-center text-white'
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid white',
          color: 'white',
          backdropFilter: 'blur(10px)',
        }}
      >
        {profile.portfolioData.about.description}
      </div>
    </div>
  );
};

export default About;
