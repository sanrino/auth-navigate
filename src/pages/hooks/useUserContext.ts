import { useContext } from 'react';
import { AppContext } from '../../providers/AuthProvider';
import { AuthContextType } from '../../shared/interfaces/auth.context';

export const useUserContext = () => {
  const { isLoggedIn, logIn, logOut } = useContext<AuthContextType>(AppContext);
  return { isLoggedIn, logIn, logOut };
};
