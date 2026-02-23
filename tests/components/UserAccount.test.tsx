import { render, screen } from '@testing-library/react';
import UserAccount, { IUserAccount } from '../../src/components/UserAccount';

// ! Render component
const renderComponent = (props: IUserAccount) => {
  const api = render(<UserAccount {...props} />);

  return {
    api,

    getButton: () => screen.queryByRole('button', { name: /edit/i }),
    getName: () => screen.getByText(props.user.name),
  };
};

// ! Props
const PROPS: IUserAccount = {
  user: { id: 1, name: 'juan', isAdmin: true },
};

// ! Tests
describe('UserAccount', () => {
  it('should render correctly the component with happy path (admin)', () => {
    // Arrange
    const { getButton, getName } = renderComponent(PROPS);

    // Assert
    expect(getButton()).toBeInTheDocument();
    expect(getName()).toBeInTheDocument();
  });

  it('should not render button is the user is not admin', () => {
    // Arrange
    const { getButton, getName } = renderComponent({
      user: { ...PROPS.user, isAdmin: false },
    });

    // Assert
    expect(getButton()).not.toBeInTheDocument();
    expect(getName()).toBeInTheDocument();
  });
});
