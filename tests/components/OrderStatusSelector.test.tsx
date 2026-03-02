import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderStatusSelector, {
  IOrderStatusSelectorProps,
} from '../../src/components/OrderStatusSelector';
import { Theme } from '@radix-ui/themes';

// ! Mocks
const mockOnChange = vi.fn();

// ! Render component
const renderComponent = (props: IOrderStatusSelectorProps) => {
  const user = userEvent.setup();
  const api = render(
    <Theme>
      <OrderStatusSelector {...props} />
    </Theme>
  );

  return {
    api,
    user,

    getDropdown: () => screen.getByRole('combobox'),
  };
};

// ! Props
const COMPONENT_PROPS: IOrderStatusSelectorProps = {
  onChange: mockOnChange,
};

// ! Tests
describe('OrderStatusSelector', () => {
  it('should render correctly the component with default value', () => {
    // Arrange
    const { getDropdown } = renderComponent(COMPONENT_PROPS);
    const dropdown = getDropdown();

    // Assert
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent(/new/i);
  });

  it('should call onChange when a status is selected', async () => {
    // Arrange
    const { user, getDropdown } = renderComponent(COMPONENT_PROPS);
    const dropdown = getDropdown();

    // Act
    await user.click(dropdown);

    const options = await screen.findAllByRole('option');
    const processedOption = options.find(
      (option) => option.textContent === 'Processed'
    ) as HTMLElement;

    await user.click(processedOption);

    // Assert
    expect(options).toHaveLength(3);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
