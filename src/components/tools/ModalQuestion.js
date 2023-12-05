import React, { useState, useEffect } from 'react';
import './Modal.css';

const ModalQuestion = ({ isOpen, onConfirm, onCancel, children }) => {
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setModalContent(children);
  }, [children]);

  const confirmModal = () => {
    setModalContent(null);
    onConfirm();
  };

  const cancelModal = () => {
    setModalContent(null);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {modalContent}
        <button className="accept-button" onClick={confirmModal}>
          Confirmar
        </button>
        <button className="accept-button" onClick={cancelModal}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalQuestion;
