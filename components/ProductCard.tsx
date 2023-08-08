import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { subscribe } from '@/domain/usecases/payments';

const ProductCard = ({ product, prices }: { product: any; prices: any[] }) => {
  const priceData = prices[0];
  const priceText = `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: priceData.currency,
  }).format(((priceData.unit_amount as number) / 100).toFixed(2))}/${
    priceData.interval ?? 'once'
  }`;

  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await subscribe({ priceId: priceData.id });
      setIsSubscribed(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(JSON.stringify(product));
  console.log(JSON.stringify(prices));
  const buttonText = isSubscribed ? 'Redirecting...' : 'Subscribe';

  return (
    <div className="flex h-60 items-center justify-center rounded-lg bg-[#2d2d2d] shadow">
      <div className="h-full w-full">
        <div className="w-full">
          <p className="px-4 pt-4 text-left text-lg font-bold text-[#42A5F5]">
            {product?.name.toUpperCase() ?? 'UNKNOWN'}
          </p>
        </div>
        <p className="px-4 pt-2 text-white">{product?.role ?? 'UNKNOWN'}</p>
        <p className="px-4 pt-8 text-3xl font-bold text-white">{priceText}</p>
        <div className="px-5 pt-10">
          <Button
            onClick={handleSubscribe}
            disabled={loading || isSubscribed}
            className="focus:shadow-outline-blue w-full rounded-sm bg-[#42A5F5] px-4 py-2 text-white hover:bg-gray-700 focus:border-gray-700 focus:outline-none active:bg-gray-800"
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: '#42A5F5' }} />
            ) : (
              buttonText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
