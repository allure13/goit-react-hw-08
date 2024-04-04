import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Layout from './Layout/Layout';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { Suspense, lazy, useEffect } from 'react';
import { refreshUser } from '../redux/auth/operations';
import Loader from './Loader/Loader';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RestrictedRoute from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

const Home = lazy(() => import('../pages/Home'));
const Contacts = lazy(() => import('../pages/Contacts'));
const Login = lazy(() => import('../pages/Login'));
const Registration = lazy(() => import('../pages/Registration'));

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<Registration />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute component={<Login />} redirectTo="/contacts" />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute component={<Contacts />} redirectTo="/login" />
              }
            />
          </Routes>
        </Suspense>
      )}
      <Toaster />
    </Layout>
  );
}
