import { render, screen } from '@testing-library/react';
import ProductImageGallery, {
  IProductImageGallery,
} from '../../src/components/ProductImageGallery';

// ! Render component
const renderComponent = (props: IProductImageGallery) => {
  const api = render(<ProductImageGallery {...props} />);

  return {
    api,
    getImages: () => screen.getAllByRole('listitem'),
  };
};

// ! Props
const COMPONENT_PROPS: IProductImageGallery = {
  imageUrls: ['https://picsum.photos/200/200', 'https://picsum.photos/400/400'],
};

// ! Tests
describe('ProductImageGallery', () => {
  it('should render correctly the component with src', () => {
    // Arrange
    const { getImages } = renderComponent(COMPONENT_PROPS);

    // Assert
    const images = getImages();
    expect(images).toHaveLength(2);

    images.forEach((image, index) => {
      const img = image.querySelector('img');
      expect(img).toHaveAttribute('src', COMPONENT_PROPS.imageUrls[index]);
    });
  });

  it('should return empty state when data is not provided', () => {
    // Arrange
    const { getImages } = renderComponent({ imageUrls: [] });

    // Assert
    expect(getImages).toHaveLength(0);
  });
});
