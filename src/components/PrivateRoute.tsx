import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../pages/hooks/useUserContext';

interface PrivateRouteProps {}

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
  children,
}) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
