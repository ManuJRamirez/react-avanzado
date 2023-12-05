import { useState } from 'react';
import FormField from '../../components/tools/FormField';
import Button from '../../components/tools/Button';
import '../loginPage/loginPage.css';
import { signup } from '../../components/auth/service';
import { useLocation, useNavigate } from 'react-router';
import Modal from '../../components/tools/Modal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [signupResponse, setSignupResponse] = useState(null);

  const openSuccessModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        <h2>Registro exitoso</h2>
        <div>¡Te has registrado correctamente!</div>
      </>,
    );
  };

  const openErrorModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        <h2>Error</h2>
        <div>No se ha podido registrar, intentalo de nuevo.</div>
      </>,
    );
  };

  const handleAccept = () => {
    setIsModalOpen(false);
    setModalContent(null);
    try {
      if (signupResponse?.email !== undefined) {
        const to = location?.state?.from?.pathname || '/login';
        navigate(to);
      }
    } catch (error) {
      setIsFeching(false);
      setError(error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsFeching(true);
      const response = await signup(credentials);
      setSignupResponse(response);
      setIsFeching(false);

      // Usuario registrado
      openSuccessModal();
    } catch (error) {
      setIsFeching(false);
      openErrorModal();
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
      <Modal isOpen={isModalOpen} onAccept={handleAccept}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default SignUpPage;
