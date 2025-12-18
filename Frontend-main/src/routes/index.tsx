import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import LayoutRoutes from '../shared/components/LayoutRotes';
import Unauthorized from '../pages/Unauthorized';
import { Suspense, lazy, useEffect, useState } from 'react';
import RequireAuth from '../shared/features/RequireAuth';
import axios from '../interceptors/axios';
import { Loading } from '../shared/components/Loading';
import { MyPageRoute } from '../shared/components/MyPageRoute';
import CoursesPage from '../pages/CoursesPage';
import LecturesPage from '../pages/LecturesPage';
import WorkPage from '../pages/WorkPage';
import AssessmentsPage from '../pages/AssessmentsPage';
import { ManagementPage } from '../pages/ManagementPage';
import { MyLayout } from '../shared/layouts/MyLayout';
import CourseManagement from '../shared/components/CourseManagement';
import PeopleManagement from '../shared/components/PeopleManagement';
import { DashboardPage } from '../pages/DashboardPage'; // Import DashboardPage
import jwt_decode from 'jwt-decode';
import useAuth from '../shared/hooks/useAuth';

export const AppRoutes = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || ''
  );
  const authCtx = useAuth();

  const SignPage = lazy(() =>
    import('../pages/SignPage').then(({ SignPage }) => ({
      default: SignPage,
    }))
  );

  useEffect(() => {
    const refreshedToken = localStorage.getItem('refreshToken');
    const accessedToken = localStorage.getItem('accessToken');

    const config = {
      headers: { Authorization: `Bearer ${refreshedToken}` },
    };

    const refresh = async () => {
      try {
        const res = await axios.get('/auth/refresh', config);
        const newToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;
        setToken(newToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        authCtx.isSignedIn = true;
        axios
          .get('/auth/whoami', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data);

            authCtx.signin(token, res.data);
          })
          .catch((error) => console.log(error.message));
      } catch (err) {
        console.error(err);
        authCtx.isSignedIn = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    };

    if (!accessedToken || !refreshedToken) {
      authCtx.isSignedIn = false;
    } else {
      try {
        authCtx.isSignedIn = true;

        const decoded = jwt_decode<{ exp: number }>(token);

        const tokenExpiration = decoded.exp * 1000;
        const now = Date.now();
        if (tokenExpiration - now < 60 * 60 * 1000) {
          refresh();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        authCtx.isSignedIn = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setIsLoading(false);
  }, [token, refreshToken]);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutRoutes />}>
          {/* public routes */}
          {!authCtx.isSignedIn ? (
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <LandingPage />
                </Suspense>
              }
            />
          ) : (
            <Route path="/my" element={<MyPageRoute />} />
          )}
          {!authCtx.isSignedIn ? (
            <Route
              path="/sign"
              element={
                <Suspense fallback={<Loading />}>
                  <SignPage />
                </Suspense>
              }
            />
          ) : (
            <Route path="/my" element={<MyPageRoute />} />
          )}
          {!authCtx.isSignedIn ? (
            <Route path="/unauthorized" element={<Unauthorized />} />
          ) : (
            <Route path="/my" element={<MyPageRoute />} />
          )}

          {/*  private routes */}
          {/*Separate Protected Nested Routes with every role. For now Admin, Student and Professor are allowed */}

          <Route
            element={
              <RequireAuth allowedRoles={['admin', 'student', 'professor']} />
            }
          >
            <Route path="/my" element={<MyPageRoute />}>
              <Route element={<MyLayout />}>
                <Route index element={<DashboardPage />} /> {/* Added Index Route */}
                <Route path="courses" element={<CoursesPage />} />
                <Route path="lecture" element={<LecturesPage />} />
                <Route path="work" element={<WorkPage />} />
                <Route path="assessment" element={<AssessmentsPage />} />
                <Route path="management" element={<ManagementPage />}>
                  <Route
                    path="management/course"
                    element={<CourseManagement />}
                  />
                  <Route
                    path="management/staff"
                    element={<PeopleManagement />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
