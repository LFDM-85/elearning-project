import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const MyLayout = (): ReactElement => {
  return <Outlet />;
};
