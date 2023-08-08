import ProductCard from '@/components/ProductCard';
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
      {products.map((product) => {
        return (
          <ProductCard product={product} key={product.id} />
        );
      })}
    </>
  );
};

export default Pricing;
