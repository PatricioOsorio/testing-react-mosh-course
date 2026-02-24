import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox, { ISearchBoxProps } from '../../src/components/SearchBox';

// ! Mocks
const onChangeMock = vi.fn();

// ! Render component
const renderComponent = (props: ISearchBoxProps) => {
  const user = userEvent.setup();
  render(<SearchBox {...props} />);

  return {
    user,

    getInputText: () => screen.getByRole('textbox'),
  };
};

// ! Props
const PROPS: ISearchBoxProps = {
  onChange: onChangeMock,
};

// ! Tests
describe('SearchBox', () => {
  it('should render correctly the component', () => {
    // Arrange
    const { getInputText } = renderComponent(PROPS);

    // Assert
    expect(getInputText()).toBeInTheDocument();
  });

  it('should be called onChange function', async () => {
    // Arrange
    const { user, getInputText } = renderComponent(PROPS);
    const input = getInputText();
    const typed = 'hello';

    // Act
    await user.type(input, `${typed}{enter}`);

    // Assert
    expect(input).toHaveValue(typed);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
