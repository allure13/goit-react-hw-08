import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';

const initialValues = {
  name: '',
  number: '',
};

const phoneRegExp = /^(\d{3}-\d{2}-\d{2})$/;
const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long!')
    .required('Required!'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required!'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const contactNameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const isDuplicateNumber = contacts.some(
      contact => contact.number === values.number
    );
    if (isDuplicateNumber) {
      alert('This phone number already exists!');
    } else {
      dispatch(addContact(values))
        .unwrap()
        .then(() => {
          toast.success('Added!');
          actions.resetForm();
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        <div className={css.div}>
          <label htmlFor={contactNameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={contactNameFieldId}
            className={css.input}
          />
          <ErrorMessage className={css.error} name="name" as="span" />
        </div>
        <div className={css.div}>
          <label htmlFor={numberFieldId} className={css.label}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            id={numberFieldId}
            className={css.input}
          />
          <ErrorMessage className={css.error} name="number" as="span" />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
