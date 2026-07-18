import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillTier from './SkillTier';
import { ISkillTier, ISkillCard } from '../../Types/GitTypes';

const tier: ISkillTier = {
  name: 'Advanced',
  cards: [
    { title: 'Frontend', pills: ['React', 'Next.js'] },
    { title: 'DevOps & Cloud', pills: ['AWS', 'Docker'] },
  ],
};

describe('SkillTier', () => {
  it('renders the uppercased tier label', () => {
    render(<SkillTier tier={tier} emphasis='default' />);
    expect(screen.getByText('■ ADVANCED')).toBeInTheDocument();
  });

  it('renders one card per valid entry', () => {
    render(<SkillTier tier={tier} emphasis='default' />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Cloud')).toBeInTheDocument();
  });

  it('skips malformed cards instead of crashing', () => {
    const malformed = {
      name: 'Broken',
      cards: [
        { title: 'Valid', pills: ['x'] },
        { title: '', pills: ['y'] },
        { title: 'No pills' } as ISkillCard,
      ],
    };
    render(<SkillTier tier={malformed} emphasis='default' />);
    expect(screen.getByText('Valid')).toBeInTheDocument();
    expect(screen.queryByText('No pills')).not.toBeInTheDocument();
  });
});
