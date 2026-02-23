export interface IProductImageGallery {
  imageUrls: string[]
}

const ProductImageGallery = ({ imageUrls }: IProductImageGallery) => {
  if (imageUrls.length === 0) return null;

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;
