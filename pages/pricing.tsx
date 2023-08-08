import ProductCard from '@/components/ProductCard';
import withAuth from '@/domain/auth/withAuth';
import { getProductAndPriceData } from '@/domain/usecases/payments';
import { NextPage } from 'next';
import auth from '@/data/auth';

export async function getStaticProps() {
  const [products, claim] = await Promise.all([
    getProductAndPriceData(),
    auth.getCustomClaimRole(),
  ]);

  return {
    props: {
      products,
      claim,
    },
  };
}

const Pricing: NextPage = ({ products, claim }: { products: any[], claim: string }) => {
  return (
    <>
      <h1 className="px-5 pt-10 text-left text-5xl font-bold text-white">
        Pricing Plans
      </h1>
      <p className="px-5 pb-10 pt-6 text-left text-lg text-white">
        Select a plan and lets get you introduced to your team from the first
        ever AI Label.
      </p>
      {products.map(({ product, prices }) => {
        return (
          <div className="px-5 py-2">
            <ProductCard product={product} prices={prices} key={product.name} />
          </div>
        );
      })}
    </>
  );
};

export default withAuth(Pricing);
