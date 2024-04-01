import { FC, useEffect, useState } from 'react';
import { Avatar, Table, Pagination, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/get-products';
import { Product } from '../../api/interfaces/products.interface';
import { Skeleton } from '../../components/Skeleton';
import { useUserContext } from '../hooks/useUserContext';
import { HiSearch } from 'react-icons/hi';

interface MainProps {}

export const Main: FC<MainProps> = ({}) => {
  const { isLoggedIn } = useUserContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const productsData = async () => {
    try {
      const result = await getProducts();
      setProducts(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => productsData(), 1000);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  //search products by name
  const handleSearchProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(({ title }) =>
    title.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <div className="pb-4">
        <TextInput
          type="search"
          placeholder="Ведіть назву товару"
          value={searchValue}
          onChange={handleSearchProducts}
          icon={HiSearch}
          className="lg:w-1/2"
        />
      </div>
      {!!currentProducts.length ? (
        <>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell className="px-3">ID</Table.HeadCell>
                <Table.HeadCell className="px-3">Назва</Table.HeadCell>
                <Table.HeadCell className="px-3">Ціна</Table.HeadCell>
                <Table.HeadCell className="px-3">Зображення</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentProducts.map(({ id, title, price, image }) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={id}
                    >
                      <Table.Cell className="whitespace-nowrap px-3 text-center font-medium text-gray-900 dark:text-white">
                        {id}
                      </Table.Cell>
                      <Table.Cell className="hover px-3 font-medium text-gray-900 dark:text-white max-sm:min-w-32 lg:w-2/3">
                        {isLoggedIn ? (
                          <Link
                            to={`/product/${id}`}
                            className="hover:text-cyan-600 hover:transition-colors"
                          >
                            {title}
                          </Link>
                        ) : (
                          <>{title}</>
                        )}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap px-3">
                        {price} ₴
                      </Table.Cell>
                      <Table.Cell className="px-3">
                        <Avatar img={image} alt={title} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
          {filteredProducts.length > productsPerPage && (
            <div className="flex justify-center overflow-x-auto py-5">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                previousLabel=""
                nextLabel=""
                showIcons
              />
            </div>
          )}
        </>
      ) : (
        <p>
          <small>За запитом «{searchValue}» нічого не знайдено.</small>
        </p>
      )}
    </div>
  );
};
