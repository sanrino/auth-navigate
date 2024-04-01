import {
  FC,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { UserLogin } from '../pages/Login/login.interface';
import { AuthContextType } from '../shared/interfaces/auth.context';

interface AuthProviderProps {}

export const AppContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const getTokenLocalStorage = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(getTokenLocalStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(getTokenLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logIn = (data: UserLogin) => {
    localStorage.setItem('token', `${data.login}-${Date.now()}`);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const value: AuthContextType = { isLoggedIn, logIn, logOut };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
