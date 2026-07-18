import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeetCodeStrip from './LeetCodeStrip';
import { ILeetSkills } from '../../Types/GitTypes';

const leetSkills: ILeetSkills = {
  advanced: [
    { tagName: 'Dynamic Programming', problemsSolved: 24 },
    { tagName: 'Union Find', problemsSolved: 2 },
  ],
  intermediate: [
    { tagName: 'Trees', problemsSolved: 18 },
    { tagName: 'Graphs', problemsSolved: 12 },
    { tagName: 'Binary Search', problemsSolved: 9 },
    { tagName: 'Hash Table', problemsSolved: 8 },
    { tagName: 'Two Pointers', problemsSolved: 7 },
  ],
  fundamental: [
    { tagName: 'Arrays', problemsSolved: 40 },
    { tagName: 'Strings', problemsSolved: 30 },
    { tagName: 'Sorting', problemsSolved: 5 },
  ],
};

describe('LeetCodeStrip', () => {
  it('renders the summed total of solved problems', () => {
    render(<LeetCodeStrip leetSkills={leetSkills} />);
    expect(screen.getByText('155')).toBeInTheDocument();
  });

  it('renders at most 8 tags, sorted by problemsSolved descending', () => {
    render(<LeetCodeStrip leetSkills={leetSkills} />);
    const pills = screen.getAllByText(/x\d+$/);
    expect(pills).toHaveLength(8);
    expect(pills[0]).toHaveTextContent('Arrays x40');
    expect(pills[1]).toHaveTextContent('Strings x30');
    expect(screen.queryByText(/Union Find/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sorting/)).not.toBeInTheDocument();
  });

  it('renders nothing when leetSkills is null', () => {
    const { container } = render(<LeetCodeStrip leetSkills={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when all lists are empty', () => {
    const { container } = render(
      <LeetCodeStrip leetSkills={{ advanced: [], intermediate: [], fundamental: [] }} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
