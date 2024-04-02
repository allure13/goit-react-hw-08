import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Layout from './Layout/Layout';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { Suspense, lazy, useEffect } from 'react';
import { refreshUser } from '../redux/auth/operations';
import Loader from './Loader/Loader';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('../pages/Home'));
const Contacts = lazy(() => import('../pages/Contacts'));
const Login = lazy(() => import('../pages/Login'));
const Registration = lazy(() => import('../pages/Registration'));
// import ContactList from './ContactList/ContactList';
// import SearchBar from './SearchBox/SearchBox';
// import ContactForm from './ContactForm/ContactForm';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   selectContacts,
//   selectError,
//   selectLoading,
// } from '../redux/contactsSlice';
// import Loader from './Loader/Loader';
// import ErrorMessage from './ErrorMessage/ErrorMessage';
// import { useEffect } from 'react';
// import { fetchContacts } from '../redux/contactsOps';
// import Notification from './Notification/Notification';
// import Title from './Title/Title';

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  // const contacts = useSelector(selectContacts);
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

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
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Suspense>
      )}
      <Toaster />
    </Layout>
  );
}

{
  /* <Title />
<ContactForm />
<SearchBar />
{contacts.length > 0 ? <ContactList /> : <Notification />}
{error && <ErrorMessage>{error}</ErrorMessage>}
{loading && <Loader>Loading message</Loader>} */
}
