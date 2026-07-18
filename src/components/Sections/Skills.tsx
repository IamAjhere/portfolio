import { ILeetSkills, IProfile } from '../../Types/GitTypes';
import LeetCodeStrip from '../Skills/LeetCodeStrip';
import LegacySkills from '../Skills/LegacySkills';
import SkillTier from '../Skills/SkillTier';
import { TierEmphasis } from '../Skills/SkillCard';

const EMPHASIS_BY_INDEX: TierEmphasis[] = ['expert', 'default', 'reduced', 'faint'];

function emphasisForTier(index: number): TierEmphasis {
  return EMPHASIS_BY_INDEX[Math.min(index, EMPHASIS_BY_INDEX.length - 1)];
}

interface SkillsProps {
  profile: IProfile | null;
  leetSkills: ILeetSkills | null;
}

function Skills({ profile, leetSkills }: SkillsProps) {
  const tiers = profile?.portfolioData.skillDepth?.tiers;

  if (!tiers || tiers.length === 0) {
    return <LegacySkills profile={profile} leetSkills={leetSkills} />;
  }

  return (
    <div className='min-h-screen flex-grow sm:pt-10'>
      <div className='w-full h-full flex flex-col items-center justify-center p-4'>
        <h1 className='text-4xl sm:mt-1 sm:text-6xl font-bold text-center text-white mb-8'>
          {'Skills'.split('').map((letter, index) => (
            <span key={`skills-${index}`} className='letter-stroke'>
              {letter}
            </span>
          ))}
        </h1>
        <div className='w-full max-w-4xl mb-8'>
          {tiers.map((tier, index) => (
            <div key={tier.name}>
              <SkillTier tier={tier} emphasis={emphasisForTier(index)} />
              {index === 0 && <LeetCodeStrip leetSkills={leetSkills} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
