import './AuthPage.css';
import { useHistory, useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const getAuthFormType = (pathname) => {
  switch (pathname) {
    case '/login': return 'login';
    case '/register': return 'register';
    default: return 'login';
  }
}

export default function AuthPage({ useAuth }) {

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  console.log(history, location, auth);

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  let type = getAuthFormType(location.pathname);

  return (
    <div className="page">
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
      <AuthForm type={ type }/>
    </div>
  );
}