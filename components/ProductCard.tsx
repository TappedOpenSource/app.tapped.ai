import { Button } from '@mui/material';
import Image from 'next/image';

const ProductCard = ({ product, prices }: { product: any, prices: any[] }) => {
  const priceData = prices[0];
  const priceText = `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: priceData.currency,
  }).format(((priceData.unit_amount as number) / 100).toFixed(2))} per ${
    priceData.interval ?? 'once'
  }`;

  console.log(JSON.stringify(product));
  console.log(JSON.stringify(prices));
  return (
    <>
      <p className="text-white">
        {product?.name.toUpperCase() ?? 'UNKNOWN'}
      </p>
      <p className="text-white">
        {product?.role ?? 'UNKNOWN'}
      </p>
      <p className="text-white">
        {priceText}
      </p>
      <Image src={product?.images[0]} alt={product?.name} width={200} height={200} />
      <Button onClick={() => subscribe({ priceId: priceData.id })}>subscribe</Button>
    </>
  );
};

export default ProductCard;
