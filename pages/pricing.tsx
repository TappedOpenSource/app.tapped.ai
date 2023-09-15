import ProductCard from '@/components/ProductCard';
import withAuth from '@/domain/auth/withAuth';
import { getProductAndPriceData } from '@/domain/usecases/payments';
import { NextPage } from 'next';
import auth from '@/data/auth';
import api from '@/data/api';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
  const products = await getProductAndPriceData();
  return {
    props: {
      products,
    },
  };
}

const Pricing: NextPage = ({ products }: {
  products: any[],
 }) => {
  const [billingPortal, setBillingPortal] = useState<string | null>(null);

  // useEffect(() => {
  //   auth.getCustomClaimRole().then((claim) => {
  //     console.log(claim);
  //     if (claim !== undefined && claim !== null) {
  //       api.createPortalLink({ returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/` }).then(({ url }) => {
  //         setBillingPortal(url);
  //       });
  //     }
  //   });
  // }, []);

  if (billingPortal) {
    return (
      <div className="flex items-center justify-center">
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
      <div className="flex flex-wrap justify-center px-5">
        {products.map(({ product, prices }) => (
          <div className="p-2 w-80" key={product.name}>
            <ProductCard product={product} prices={prices} />
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuth(Pricing);
