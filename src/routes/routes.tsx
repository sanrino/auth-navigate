import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PrivateRoute } from '../components/PrivateRoute';
import { ErrorPage } from '../pages/Error/Error';
import { Login } from '../pages/Login/Login';
import { Main } from '../pages/Main/Main';
import { ProductItem } from '../pages/Product/Product';
import { HOME, LOGIN, PRODUCT } from '../shared/consts/route.consts';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: HOME,
        element: <Main />,
        index: true,
      },
      {
        path: PRODUCT,
        element: (
          <PrivateRoute>
            <ProductItem />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
