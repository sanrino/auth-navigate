import { FC, useEffect, useState } from 'react';
import { Badge, Card } from 'flowbite-react';
import { getProductById } from '../../api/get-product-by-id';
import { useParams } from 'react-router-dom';
import { Product } from '../../api/interfaces/products.interface';
import { Skeleton } from '../../components/Skeleton';

import { useNavigate } from 'react-router-dom';

interface ProductItemProps {}

export const ProductItem: FC<ProductItemProps> = ({}) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productData = async () => {
      try {
        if (productId) {
          const result = await getProductById(productId);
          if (Object.keys(result).length !== 0) {
            setProduct(result);
            setLoading(false);
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    setTimeout(() => productData(), 200);
  }, [productId, navigate]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Card className="flex w-full md:max-w-full">
        <div className="lg:flex">
          <div className="flex h-60 shrink-0 justify-center pb-4 lg:w-1/2 lg:px-4">
            <img src={product?.image} alt={product?.title} className="h-full" />
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product?.title}
            </h5>

            <div className="flex">
              <Badge color="info">{product?.category}</Badge>
            </div>

            <p className="break-words">
              <small>{product?.description}</small>
            </p>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center">
                <span className="rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {product?.rating?.rate}
                </span>
                <svg
                  className="size-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-2">
                  <small>({product?.rating?.count})</small>
                </span>
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {product?.price} ₴
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
