import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('test infrastructure', () => {
  it('renders JSX and supports jest-dom matchers', () => {
    render(<div>hello vitest</div>);
    expect(screen.getByText('hello vitest')).toBeInTheDocument();
  });
});
