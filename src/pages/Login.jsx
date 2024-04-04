import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle/PageTitle';
import LoginForm from '../components/LoginForm/LoginForm';

export default function Login() {
  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />
      <p>
        or <Link to="/register">register</Link>
      </p>
    </div>
  );
}
