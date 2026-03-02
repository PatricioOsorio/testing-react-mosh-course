import OrderStatusSelector from '../components/OrderStatusSelector';

const PlaygroundPage = () => {
  return (
    <>
      <OrderStatusSelector onChange={(status) => console.log('Selected status:', status)} />
    </>
  );
};

export default PlaygroundPage;
