import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableText, { IExpandableTextProps } from '../../src/components/ExpandableText';

// ! Render component
const renderComponent = (props: IExpandableTextProps) => {
  const user = userEvent.setup();
  const api = render(<ExpandableText {...props} />);

  return {
    api,
    user,

    getTextContent: (text: string) => screen.queryByText(text),
    getButton: () => screen.getByRole('button'),
  };
};

// ! Tests
describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, 255) + '...';

  const shortText = 'short';

  it('should render correctly the component', async () => {
    // Arrange
    const { getTextContent } = renderComponent({
      text: shortText,
    });

    // Assert
    expect(getTextContent(shortText)).toBeInTheDocument();
  });

  it('should show ellipsis when text is longer than 255 characters', () => {
    // Arrange
    const { getTextContent } = renderComponent({
      text: longText,
    });

    // Assert
    expect(getTextContent(truncatedText)).toBeInTheDocument();
  });

  it('should expand text when button "show more" is clicked', async () => {
    // Arrange
    const { user, getTextContent, getButton } = renderComponent({
      text: longText,
    });
    const btn = getButton();

    // Act
    await user.click(btn);

    // Assert
    expect(getTextContent(longText)).toBeInTheDocument();
    expect(btn).toHaveTextContent(/show less/i);
  });

  it('should collapse text when button "show less " is clicked', async () => {
    // Arrange
    const { user, getTextContent, getButton } = renderComponent({
      text: longText,
    });
    const btn = getButton();

    // Act
    await user.click(btn);
    await user.click(btn);

    expect(getTextContent(longText)).not.toBeInTheDocument();
    expect(btn).toHaveTextContent(/show more/i);
  });
});
