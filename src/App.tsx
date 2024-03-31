import { useEffect, useState } from 'react';
import './App.css';
import CustomCursor from './components/Cursor/CustomCursor';
import GalaxyBackground from './components/GalaxyBackground';
import Header from './components/header';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import axios from 'axios';
import { IProfile, IRepository, ILeetSkills } from './Types/GitTypes';
import {
  GITHUB_USER_API_URL,
  STATIC_DATA_RAW,
  YOUR_NETLIFY_FUNCTION_URL,
} from './constants';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [repos, setRepos] = useState<IRepository[] | null>(null);
  const [leetCodeSkills, setLeetCodeSkills] = useState<ILeetSkills | null>(
    null
  );
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is still valid
        if (lastFetched && Date.now() - lastFetched < 10 * 60 * 1000) {
          setIsLoading(false);
          return;
        }

        let combinedProfileData: IProfile | null = null;
        let fetchedLeetCodeSkills: ILeetSkills | null = null;
        let fetchedRepos: IRepository[] | null = null;

        // Try to retrieve data from local storage
        const storedProfile = localStorage.getItem('profile');
        const storedRepos = localStorage.getItem('repos');
        const storedLeetCodeSkills = localStorage.getItem('leetCodeSkills');
        const storedLastFetched = localStorage.getItem('lastFetched');

        if (
          storedProfile &&
          storedRepos &&
          storedLeetCodeSkills &&
          storedLastFetched &&
          Date.now() - Number(storedLastFetched) < 10 * 60 * 1000
        ) {
          combinedProfileData = JSON.parse(storedProfile);
          fetchedRepos = JSON.parse(storedRepos);
          fetchedLeetCodeSkills = JSON.parse(storedLeetCodeSkills);
        } else {
          const apiCalls = [
            axios.get(GITHUB_USER_API_URL),
            axios.get(GITHUB_USER_API_URL + '/repos'),
            axios.get(STATIC_DATA_RAW),
          ];
          if (process.env.NODE_ENV !== 'development') {
            apiCalls.push(axios.get(YOUR_NETLIFY_FUNCTION_URL));
          }
          const [
            profileResponse,
            reposResponse,
            portfolioDataResponse,
            leetCodeSkill,
          ] = await Promise.all(apiCalls);

          combinedProfileData = {
            ...profileResponse.data,
            portfolioData: portfolioDataResponse.data,
          };

          fetchedRepos = reposResponse.data;
          fetchedLeetCodeSkills = leetCodeSkill ? leetCodeSkill.data : null;

          // Store data in local storage
          localStorage.setItem('profile', JSON.stringify(combinedProfileData));
          localStorage.setItem('repos', JSON.stringify(fetchedRepos));
          localStorage.setItem(
            'leetCodeSkills',
            JSON.stringify(fetchedLeetCodeSkills)
          );
          localStorage.setItem('lastFetched', String(Date.now()));
        }

        if (fetchedLeetCodeSkills) {
          setLeetCodeSkills(fetchedLeetCodeSkills);
        }

        setRepos(fetchedRepos);
        setProfile(combinedProfileData);
        setLastFetched(Date.now());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='relative w-full h-full'>
      <CustomCursor />
      <Header name={`${profile?.name}`} />
      <GalaxyBackground />
      <div className='flex flex-col items-stretch h-full z-20 mb-32 '>
        <div className='container mx-auto px-4 flex-grow'>
          <div id='about' className='min-h-screen md:h-screen  '>
            <About profile={profile} />
          </div>
          <div id='projects' className='min-h-screen md:h-screen '>
            <Projects repos={repos} login={profile?.login} />
          </div>
          <div id='skills' className='min-h-screen md:h-screen  '>
            <Skills profile={profile} leetSkills={leetCodeSkills} />
          </div>
          <div id='contact' className='min-h-screen md:h-screen  '>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
