import { UserLogin } from '../../pages/Login/login.interface';

export interface AuthContextType {
  isLoggedIn: boolean;
  logIn?: (data: UserLogin) => void;
  logOut?: () => void;
}
