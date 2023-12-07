import FormField from '../../components/tools/FormField';
import { useState } from 'react';
import Button from '../../components/tools/Button';
import './LoginPage.css';
import { login } from '../../components/auth/service';
import { useAuth } from '../../components/auth/context';
import { useLocation, useNavigate } from 'react-router';

function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [isFetching, setIsFeching] = useState(false);

  const { email, password } = credentials;
  const buttonDisabled = !(email && password) || isFetching;
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsFeching(true);
      await login(credentials);
      setIsFeching(false);
      onLogin();

      const to = location?.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setIsFeching(false);
      setError(error);
    }
  };

  const handleChange = event => {
    setCredentials(currentCredentials => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = () => navigate('/signup');

  const handleRememberMeChange = event => {
    setCredentials(currentCredentials => ({
      ...currentCredentials,
      rememberMe: event.target.checked,
    }));
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in NodePoP</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="email"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.email}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <label>
          Recordar contraseña:
          <input
            type="checkbox"
            name="rememberMe"
            checked={credentials.rememberMe}
            onChange={handleRememberMeChange}
          />
        </label>
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          {isFetching ? 'Connecting...' : 'Log in'}
        </Button>
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
          onClick={handleClick}
        >
          Sign Up
        </Button>
        {error && (
          <div className="loginPage-error" onClick={resetError}>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
