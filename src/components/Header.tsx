import { FC } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import { HOME, LOGIN } from '../shared/consts/route.consts';
import { useUserContext } from '../pages/hooks/useUserContext';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const { productId } = useParams();
  const { isLoggedIn, logOut } = useUserContext();

  return (
    <Navbar fluid rounded className="px-0 pb-6 sm:px-0">
      {productId && (
        <Button as={Link} to={HOME}>
          <HiOutlineArrowLeft className="size-5" />
        </Button>
      )}

      <div className="ml-auto flex">
        {isLoggedIn ? (
          <Button onClick={logOut}>Вихід</Button>
        ) : (
          <Button as={Link} to={LOGIN}>
            Вхід
          </Button>
        )}
      </div>
    </Navbar>
  );
};
