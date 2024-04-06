import { Field, Form, Formik } from 'formik';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { Button } from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
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
      // validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId} className={css.label}>
          name
        </label>
        <Field
          className={css.field}
          type="text"
          name="name"
          placeholder="Your Name"
          id={nameFieldId}
        />
        <label htmlFor={emailFieldId} className={css.label}>
          email
        </label>
        <Field
          className={css.field}
          type="email"
          name="email"
          placeholder="Email"
          id={emailFieldId}
        />
        <label htmlFor={passwordFieldId} className={css.label}>
          password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          placeholder="password"
          id={passwordFieldId}
        />
        <Button variant="contained" type="submit" className={css.btn}>
          Create your account
        </Button>
      </Form>
    </Formik>
  );
}
