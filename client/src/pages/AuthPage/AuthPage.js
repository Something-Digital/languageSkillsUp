import './AuthPage.css';
import AuthForm from '../../components/AuthForm';

export default function AuthPage({ useAuth }) {
  return (
    <div className="page">
      <AuthForm useAuth={ useAuth } />
    </div>
  );
}