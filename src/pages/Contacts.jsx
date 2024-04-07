import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectLoading } from '../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contacts/operations';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle/PageTitle';
import ContactForm from '../components/ContactForm/ContactForm';
import SearchBar from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList';
import Notification from '../components/Notification/Notification';
import Loader from '../components/Loader/Loader';

export default function Contacts() {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts()).catch(() =>
      toast.error('Something went wrong! Try again.')
    );
  }, [dispatch]);

  return (
    <main>
      <PageTitle />
      <ContactForm />
      <SearchBar />
      {contacts.length > 0 ? <ContactList /> : <Notification />}
      {loading && <Loader />}
    </main>
  );
}
