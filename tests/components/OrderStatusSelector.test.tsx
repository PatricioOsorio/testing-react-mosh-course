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

    getStatusCombobox: () => screen.getByRole('combobox'),
    findOptions: async () => screen.findAllByRole('option'),
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
    const { getStatusCombobox } = renderComponent(COMPONENT_PROPS);
    const dropdown = getStatusCombobox();

    // Assert
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent(/new/i);
  });

  it('should call onChange when a status is selected', async () => {
    // Arrange
    const { user, getStatusCombobox, findOptions } = renderComponent(COMPONENT_PROPS);
    const dropdown = getStatusCombobox();

    // Act
    await user.click(dropdown);

    const options = await findOptions();
    const processedOption = options.find(
      (option) => option.textContent === 'Processed'
    ) as HTMLElement;

    await user.click(processedOption);

    // Assert
    expect(options).toHaveLength(3);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
