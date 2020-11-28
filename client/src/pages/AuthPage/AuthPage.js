import './AuthPage.css';
import { useHistory, useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

export default function AuthPage({ useAuth }) {

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div className="page">
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
      <AuthForm />
    </div>
  );
}