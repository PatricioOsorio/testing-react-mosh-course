import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TermsAndConditions from '../../src/components/TermsAndConditions';

// ! Render component
const renderComponent = () => {
  const user = userEvent.setup();
  const api = render(<TermsAndConditions />);

  return {
    api,
    user,

    getTitle: () => screen.getByRole('heading', { level: 1 }),
    getCheckbox: () => screen.getByRole('checkbox'),
    getButton: () => screen.getByRole('button', { name: /submit/i }),
  };
};

// ! Tests
describe('TermsAndConditions.test', () => {
  it('should render correctly the component', () => {
    // Arrange
    const { getTitle, getCheckbox, getButton } = renderComponent();

    // Assert
    expect(getTitle()).toHaveTextContent(/terms/i);
    expect(getCheckbox()).not.toBeChecked();
    expect(getButton()).toBeDisabled();
  });

  it('should enable the button when the checkbox is checked', async () => {
    // Arrange
    const { user, getCheckbox, getButton } = renderComponent();

    // Act
    await user.click(getCheckbox());

    // Assert
    expect(getButton()).toBeEnabled();
    expect(getCheckbox()).toBeChecked();
  });
});
