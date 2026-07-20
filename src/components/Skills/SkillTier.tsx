import { ISkillCard, ISkillTier } from '../../Types/GitTypes';
import SkillCard, { TierEmphasis } from './SkillCard';

interface SkillTierProps {
  tier: ISkillTier;
  emphasis: TierEmphasis;
}

function isValidCard(card: ISkillCard): boolean {
  return Boolean(card.title) && Array.isArray(card.pills) && card.pills.length > 0;
}

function gridClass(cardCount: number): string {
  if (cardCount >= 3) {
    return 'grid grid-cols-1 md:grid-cols-3 gap-4';
  }
  if (cardCount === 2) {
    return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
  }
  return 'grid grid-cols-1 gap-4';
}

function SkillTier({ tier, emphasis }: SkillTierProps) {
  const cards = tier.cards.filter(isValidCard);

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className='mb-6 w-full'>
      <div className='text-gray-400 text-xs tracking-[0.18em] mb-2 select-none'>
        {`■ ${tier.name.toUpperCase()}`}
      </div>
      <div className={gridClass(cards.length)}>
        {cards.map((card) => (
          <SkillCard key={card.title} card={card} emphasis={emphasis} />
        ))}
      </div>
    </div>
  );
}

export default SkillTier;
