import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  console.log(filteredContacts);
  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <Contact name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
}
