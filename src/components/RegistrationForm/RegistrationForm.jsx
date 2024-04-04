import { Field, Form, Formik } from 'formik';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long!')
    .required('Required!'),
  email: Yup.string().email('Please, enter a valid email').required('Required'),
  password: Yup.string()
    .matches(passwordRules, {
      message:
        'Please create a stronger password. Min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
    })
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const nameFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form className={css.btn}>
        <label htmlFor={nameFieldId}></label>
        <Field
          className={css.btn}
          type="text"
          name="name"
          placeholder="Your Name"
          id={nameFieldId}
        />
        <label htmlFor={emailFieldId}></label>
        <Field
          className={css.btn}
          type="email"
          name="email"
          placeholder="Email"
          id={emailFieldId}
        />
        <label htmlFor={passwordFieldId}></label>
        <Field
          className={css.btn}
          type="password"
          name="password"
          placeholder="password"
          id={passwordFieldId}
        />
        <button type="submit" className={css.btn}>
          Register
        </button>
      </Form>
    </Formik>
  );
}
