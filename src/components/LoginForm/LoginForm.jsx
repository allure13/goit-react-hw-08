import { Field, Form, Formik } from 'formik';
import css from './LoginForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { Button } from '@mui/material';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please, enter a valid email').required('Required'),
  password: Yup.string()
    .matches(passwordRules, { message: 'Invalid password' })
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={LoginSchema}
    >
      <Form className={css.form}>
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
          Log In
        </Button>
      </Form>
    </Formik>
  );
}
