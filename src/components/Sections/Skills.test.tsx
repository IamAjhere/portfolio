import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import { IProfile, ISkillDepth } from '../../Types/GitTypes';

const skillDepth: ISkillDepth = {
  tiers: [
    {
      name: 'Expert',
      cards: [
        {
          title: 'Backend & API Engineering',
          pills: ['NestJS'],
          highlights: '15+ production microservices',
        },
      ],
    },
    { name: 'Advanced', cards: [{ title: 'Frontend', pills: ['React'] }] },
  ],
};

function makeProfile(withDepth: boolean): IProfile {
  return {
    login: 'IamAjHere',
    id: 1,
    avatar_url: '',
    html_url: '',
    name: 'Mohamed Ajmal',
    company: null,
    blog: '',
    location: null,
    email: null,
    bio: null,
    public_repos: 0,
    followers: 0,
    following: 0,
    portfolioData: {
      about: { job_title: 'Engineer', description: 'desc' },
      skills: { languages: ['TypeScript'] },
      ...(withDepth ? { skillDepth } : {}),
    },
  };
}

const leetSkills = {
  advanced: [{ tagName: 'Dynamic Programming', problemsSolved: 24 }],
  intermediate: [],
  fundamental: [],
};

describe('Skills section', () => {
  it('renders the bento grid when skillDepth is present', () => {
    render(<Skills profile={makeProfile(true)} leetSkills={leetSkills} />);
    expect(screen.getByText('■ EXPERT')).toBeInTheDocument();
    expect(screen.getByText('■ ADVANCED')).toBeInTheDocument();
    expect(screen.getByText('Backend & API Engineering')).toBeInTheDocument();
  });

  it('places the LeetCode strip between the first and second tiers', () => {
    render(<Skills profile={makeProfile(true)} leetSkills={leetSkills} />);
    const labels = [
      screen.getByText('■ EXPERT'),
      screen.getByText(/LIVE — PROBLEM SOLVING/),
      screen.getByText('■ ADVANCED'),
    ];
    // document order: EXPERT before LIVE before ADVANCED
    expect(
      labels[0].compareDocumentPosition(labels[1]) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      labels[1].compareDocumentPosition(labels[2]) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('falls back to the legacy layout when skillDepth is absent', () => {
    render(<Skills profile={makeProfile(false)} leetSkills={leetSkills} />);
    expect(screen.getByText('Leet Coding Skills')).toBeInTheDocument();
    expect(screen.getByText('Overall Skills')).toBeInTheDocument();
    expect(screen.queryByText('■ EXPERT')).not.toBeInTheDocument();
  });

  it('falls back to the legacy layout when skillDepth has no tiers', () => {
    const profile = makeProfile(true);
    profile.portfolioData.skillDepth = { tiers: [] };
    render(<Skills profile={profile} leetSkills={leetSkills} />);
    expect(screen.getByText('Overall Skills')).toBeInTheDocument();
  });
});
