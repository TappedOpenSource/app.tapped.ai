import { useState } from 'react';
import { Button, CircularProgress, Icon } from '@mui/material';
import { subscribe } from '@/domain/usecases/payments';

const ProductCard = ({ product, price }: {
  product: any;
  price: any;
 }) => {
  const priceWithCents = (price.unit_amount / 100).toFixed(2);

  console.log(JSON.stringify(product, null, 2));

  const formatedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }).format(priceWithCents);
  const priceText = `${formatedPrice} / ${price.interval ?? 'once'}`;

  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await subscribe({ priceId: price.id });
      setIsSubscribed(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const buttonText = isSubscribed ? 'Redirecting...' : 'Subscribe';
  return (
    <div className="h-full flex items-center justify-center rounded-lg bg-[#2d2d2d] shadow">
      <div>
        <div>
          <p className="px-4 pt-4 text-left text-lg font-bold text-[#42A5F5]">
            {product?.name.toUpperCase() ?? ''}
          </p>
        </div>
        {/* <p className="px-4 pt-2 text-white">{product?.description ?? ''}</p> */}
        {/* <div className="p-4 flex flex-col gap-4">
          {product?.description?.split('#').map((feature: string, key: string) => {
            return (
              <div key={key} className='flex flex-row'>
                <Icon className='text-[#42A5F5]'>check_circle</Icon>
                <div className='pr-4'></div>
                <p>{feature}</p>
              </div>
            );
          })}
        </div> */}
        <p className="px-4 pt-8 text-3xl font-bold text-white">{priceText}</p>
        <div className="px-5 pt-10">
          <button
            onClick={handleSubscribe}
            disabled={loading || isSubscribed}
            className={`focus:shadow-outline-blue w-full rounded-sm bg-[#42A5F5] px-4 py-2 my-6 text-white hover:bg-gray-700 focus:border-gray-700 focus:outline-none active:bg-gray-800 ${
              loading || isSubscribed ? 'cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <CircularProgress size={16} style={{ color: 'inherit' }} />
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
