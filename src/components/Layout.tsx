import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

interface LayoutProps {}

export const Layout: FC<PropsWithChildren<LayoutProps>> = () => {
  return (
    <>
      <div className="container mx-auto px-2 pb-6 md:w-2/3">
        <Header />
        <Outlet />
      </div>
    </>
  );
};
