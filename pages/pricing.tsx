import type { NextPage } from 'next';
import ProductCard from '@/components/ProductCard';
// import withAuth from '@/domain/auth/withAuth';
import { getProductAndPriceData } from '@/domain/usecases/payments';
import { useEffect, useState } from 'react';
import MarketplaceProductCard from '@/components/MarketplaceProductCard';
import auth from '@/data/auth';
import api from '@/data/api';
import { useRouter } from 'next/router';

const subscriptionPlansIds = [
  'prod_P4wsGUAj9eeoni', // starter
];

const Pricing: NextPage = () => {
  const router = useRouter();
  const [billingPortal, setBillingPortal] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductAndPriceData();
      console.log({ products });
      setProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    auth.getCustomClaims().then((claims) => {
      console.log({ claims });

      if (claims === undefined || claims === null) {
        router.push({
          pathname: '/login',
          query: { returnUrl: router.pathname },
        });
        return;
      }

      const claim = claims['stripeRole'] as string | null;
      console.log({ claim });
      // if (claim !== undefined && claim !== null) {
      //   api.createPortalLink({ returnUrl: `${window.location.origin}/pricing` }).then(({ url }) => {
      //     console.log({ url });
      //     setBillingPortal(url);
      //   });
      // }
    });
  }, [router]);

  if (billingPortal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <a
          href={billingPortal}
          className="px-5 py-2 text-white bg-[#42A5F5] rounded-md"
        >
        Manage Subscription
        </a>
      </div>
    );
  }

  return (
    <>
      <h1 className="px-5 pt-10 text-left text-5xl font-bold text-white">
        Pricing Plans
      </h1>
      <p className="px-5 pb-10 pt-6 text-left text-lg text-white text-center">
        Select a plan and lets get you introduced to your team from the first
        ever Ai Label.
      </p>
      <div className="flex flex-col md:flex-row justify-center">
        {products.filter(({ product }) => {
          console.log(product.name);
          return subscriptionPlansIds.includes(product.id);
        }).map(({ product, prices }) => {
          return (
            <div className="px-5 py-2" key={product.name}>
              <ProductCard product={product} prices={prices} key={product.name} />
            </div>
          );
        })}
      </div>
      {/* <div className="px-5 py-2">
        <MarketplaceProductCard />
      </div> */}
    </>
  );
};

export default Pricing;
