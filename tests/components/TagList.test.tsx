import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagList from '../../src/components/TagList';

// ! Render component
const renderComponent = () => {
  const user = userEvent.setup();
  const api = render(<TagList />);

  return {
    api,
    user,

    findItems: () => screen.findAllByRole('listitem'),
  };
};

// ! Tests
describe('TagList', () => {
  it('should render correctly the component', async () => {
    // Arrange
    const { findItems } = renderComponent();

    const items = await findItems();

    // Assert
    expect(items.length).toBeGreaterThan(1);
  });
});
