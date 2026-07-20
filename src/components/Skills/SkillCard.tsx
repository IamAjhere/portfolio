import { ISkillCard } from '../../Types/GitTypes';

export type TierEmphasis = 'expert' | 'default' | 'reduced' | 'faint';

export const PILL_CLASS =
  'inline-flex items-center px-2 py-1 whitespace-nowrap leading-6 rounded-full text-white bg-black border custom-shadow-2px transition-all duration-200';

const EMPHASIS_CLASSES: Record<TierEmphasis, string> = {
  expert: 'border-2 shadow-[0_0_18px_rgba(255,255,255,0.15)]',
  default: 'border',
  reduced: 'border opacity-85',
  faint: 'border opacity-70',
};

interface SkillCardProps {
  card: ISkillCard;
  emphasis: TierEmphasis;
}

function SkillCard({ card, emphasis }: SkillCardProps) {
  return (
    <div
      className={`rounded-lg border-white p-4 text-white custom-shadow transition-all duration-200 ${EMPHASIS_CLASSES[emphasis]}`}
      style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }}
    >
      <h3 className='text-base sm:text-lg font-bold'>
        {card.title}
        {card.growing && (
          <span className='ml-2 text-xs sm:text-sm font-normal text-gray-400'>
            ↗ rapidly growing
          </span>
        )}
      </h3>
      {card.subtitle && (
        <p className='text-xs text-gray-400 mb-2'>{card.subtitle}</p>
      )}
      <div className='flex flex-wrap gap-2 mt-2 text-xs'>
        {card.pills.map((pill) => (
          <span key={pill} className={PILL_CLASS}>
            {pill}
          </span>
        ))}
      </div>
      {card.highlights && (
        <p className='text-xs text-gray-300 mt-3'>→ {card.highlights}</p>
      )}
    </div>
  );
}

export default SkillCard;
