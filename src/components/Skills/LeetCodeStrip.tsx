import { ILeetSkills, ISkill } from '../../Types/GitTypes';
import { PILL_CLASS } from './SkillCard';

const TOP_TAG_COUNT = 8;

interface LeetCodeStripProps {
  leetSkills: ILeetSkills | null;
}

function collectTags(leetSkills: ILeetSkills): ISkill[] {
  return [
    ...(leetSkills.advanced ?? []),
    ...(leetSkills.intermediate ?? []),
    ...(leetSkills.fundamental ?? []),
  ];
}

function LeetCodeStrip({ leetSkills }: LeetCodeStripProps) {
  if (!leetSkills) {
    return null;
  }

  const allTags = collectTags(leetSkills);

  if (allTags.length === 0) {
    return null;
  }

  const totalSolved = allTags.reduce((sum, tag) => sum + tag.problemsSolved, 0);
  const topTags = [...allTags]
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, TOP_TAG_COUNT);

  return (
    <div className='mb-6 w-full'>
      <div className='flex items-center text-gray-400 text-xs tracking-[0.18em] mb-2 select-none'>
        <span
          className='inline-block w-2 h-2 rounded-full bg-green-400 mr-2'
          style={{ animation: 'live-pulse 1.6s infinite' }}
        />
        LIVE — PROBLEM SOLVING (LEETCODE)
      </div>
      <div
        className='rounded-lg border border-white p-4 text-white custom-shadow flex items-center gap-5 flex-wrap'
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }}
      >
        <div className='text-center'>
          <div className='text-2xl font-bold'>{totalSolved}</div>
          <div className='text-[10px] text-gray-400 tracking-widest'>SOLVED</div>
        </div>
        <div className='self-stretch border-l border-white/25' />
        <div className='flex flex-wrap gap-2 text-xs flex-1'>
          {topTags.map((tag) => (
            <span key={tag.tagName} className={PILL_CLASS}>
              {`${tag.tagName} x${tag.problemsSolved}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeetCodeStrip;
