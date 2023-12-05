import { useNavigate } from 'react-router-dom';
import Button from '../tools/Button';
import { useAuth } from './context';
import { logout } from '../auth/service';
import ModalQuestion from '../tools/ModalQuestion';
import { useState } from 'react';

function AuthButton({ className }) {
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleConfirm = async () => {
    setIsModalQuestionOpen(false);
    setModalContent(null);

    await logout();
    onLogout();
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalQuestionOpen(false);
    setModalContent(null);
  };

  const handleLogoutClick = async () => {
    openQuestionModal();
  };

  const openQuestionModal = () => {
    setIsModalQuestionOpen(true);
    setModalContent(
      <>
        <h2>¿Estás seguro que quieres desloguear, soci@?</h2>
      </>,
    );
  };

  return (
    <div>
      <Button onClick={handleLogoutClick} className={className}>
        Logout
      </Button>
      <ModalQuestion
        isOpen={isModalQuestionOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        {modalContent}
      </ModalQuestion>
    </div>
  );
}

export default AuthButton;
