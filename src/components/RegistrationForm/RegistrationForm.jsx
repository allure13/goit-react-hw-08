import { Field, Form, Formik } from 'formik';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.btn}>
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
