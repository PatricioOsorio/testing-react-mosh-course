import { render, screen } from '@testing-library/react';
import UserList, { IUserList } from '../../src/components/UserList';

// ! Render component
const renderComponent = (props: IUserList) => {
  const api = render(<UserList {...props} />);

  return {
    api,
    getUsers: () => screen.getAllByRole('listitem'),
    getEmptyState: () => screen.getByText(/no users/i),
  };
};

// ! Props
const COMPONENT_PROPS: IUserList = {
  users: [
    { id: 1, name: 'user 1', isAdmin: true },
    { id: 2, name: 'user 2', isAdmin: false },
  ],
};

// ! Tests
describe('UserList', () => {
  it('should render correctly the component', () => {
    // Arrange
    const { getUsers } = renderComponent(COMPONENT_PROPS);

    // Assert
    expect(getUsers()).toHaveLength(2);
  });

  it('should return empty state when users are not provided', () => {
    // Arrange
    const { getEmptyState } = renderComponent({ users: [] });

    // Assert
    expect(getEmptyState()).toBeInTheDocument();
  });
});
