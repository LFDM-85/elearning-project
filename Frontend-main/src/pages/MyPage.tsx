import SideBar from '../shared/components/SideBar';
import { MyLayout } from '../shared/layouts/MyLayout';
import React, { ReactElement } from 'react';

export const MyPage: React.FC = (): ReactElement => {
  return (
    <div>
      <SideBar>
        <MyLayout />
      </SideBar>
    </div>
  );
};
