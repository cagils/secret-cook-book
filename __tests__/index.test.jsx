import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const link = screen.getByRole('link', {
      name: 'Go to My Secret Recipes',
    });

    expect(link).toBeInTheDocument();
  });
});
