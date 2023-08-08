import ProductCard from '@/components/ProductCard';
import withAuth from '@/domain/auth/withAuth';
import { getProductAndPriceData } from '@/domain/usecases/payments';
import { NextPage } from 'next';

export async function getStaticProps() {
  const products = await getProductAndPriceData();

  return {
    props: {
      products,
    },
  };
}

const Pricing: NextPage = ({ products }: { products: any[] }) => {
  console.log(products);

  return (
    <>
      <h1>
            pricing
      </h1>
      {products.map(({ product, prices }) => {
        return (
          <ProductCard product={product} prices={prices} key={product.name} />
        );
      })}
    </>
  );
};

export default withAuth(Pricing);
