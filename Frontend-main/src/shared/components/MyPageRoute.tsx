import { Suspense } from 'react';
import { MyPage } from '../../pages/MyPage';
import { Loading } from './Loading';

export const MyPageRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPage />
    </Suspense>
  );
};
