import { useState } from 'react';
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import '../loginPage/LoginPage.css';
import { signup } from './service';
import { useLocation, useNavigate } from 'react-router';

function SignUpPage() {
  const [error, setError] = useState(null);
  const [isFetching, setIsFeching] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
  });
  const handleChange = event => {
    setCredentials(currentCredentials => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password, username, name } = credentials;
  const buttonDisabled = !(email && password && username && name) || isFetching;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsFeching(true);
      await signup(credentials);
      setIsFeching(false);
      const to = location?.state?.from?.pathname || '/login';
      navigate(to);
    } catch (error) {
      setIsFeching(false);
      setError(error);
    }
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
        <FormField
          type="text"
          name="username"
          label="Username"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.username}
        />
        <FormField
          type="text"
          name="name"
          label="Name"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.name}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          Sign Up!
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

export default SignUpPage;
