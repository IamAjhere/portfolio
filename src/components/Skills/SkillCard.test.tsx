import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillCard from './SkillCard';
import { ISkillCard } from '../../Types/GitTypes';

const card: ISkillCard = {
  title: 'Backend & API Engineering',
  subtitle: 'NestJS microservices · GraphQL',
  pills: ['NestJS', 'Node.js'],
  highlights: '15+ production microservices',
};

describe('SkillCard', () => {
  it('renders title, subtitle, pills and highlights', () => {
    render(<SkillCard card={card} emphasis='expert' />);
    expect(screen.getByText('Backend & API Engineering')).toBeInTheDocument();
    expect(screen.getByText('NestJS microservices · GraphQL')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText(/15\+ production microservices/)).toBeInTheDocument();
  });

  it('omits subtitle and highlights when absent', () => {
    render(<SkillCard card={{ title: 'Web3', pills: ['Ethers.js'] }} emphasis='reduced' />);
    expect(screen.getByText('Web3')).toBeInTheDocument();
    expect(screen.queryByText(/→/)).not.toBeInTheDocument();
  });

  it('shows the growing marker only when growing is true', () => {
    render(<SkillCard card={{ title: 'AI / Agent Engineering', pills: ['MCP'], growing: true }} emphasis='default' />);
    expect(screen.getByText(/rapidly growing/)).toBeInTheDocument();
  });

  it('applies the expert emphasis classes', () => {
    const { container } = render(<SkillCard card={card} emphasis='expert' />);
    expect(container.firstElementChild?.className).toContain('border-2');
  });

  it('applies faint emphasis opacity', () => {
    const { container } = render(<SkillCard card={card} emphasis='faint' />);
    expect(container.firstElementChild?.className).toContain('opacity-70');
  });
});
