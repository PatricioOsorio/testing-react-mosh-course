import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastDemo from '../../src/components/ToastDemo';
import { Toaster } from 'react-hot-toast';

// ! Render component
const renderComponent = () => {
  const user = userEvent.setup();
  const api = render(
    <>
      <ToastDemo />
      <Toaster />
    </>
  );

  return {
    api,
    user,

    getButton: () => screen.getByRole('button', { name: /show/i }),
    findToast: () => screen.findByText(/success/i),
  };
};

// ! Tests
describe('ToastDemo.test', () => {
  it('should render correctly the toast', async () => {
    // Arrange
    const { user, getButton, findToast } = renderComponent();
    const buttonShowToast = getButton();

    // Act
    await user.click(buttonShowToast);
    const toast = await findToast();

    // Assert
    expect(toast).toBeInTheDocument();
  });
});
