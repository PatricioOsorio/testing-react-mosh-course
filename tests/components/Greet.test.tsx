import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet';

describe('Greet', () => {
  it('should render "Hello" with the name when name is provided', () => {
    // Arrange
    render(<Greet name="John" />);

    // Act
    const heading = screen.getByRole('heading');

    // Assert
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/john/i);

    screen.debug();
  });

  it('should render login when name is not provided', () => {
    // Arrange
    render(<Greet />);

    // Act
    const button = screen.getByRole('button');

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
