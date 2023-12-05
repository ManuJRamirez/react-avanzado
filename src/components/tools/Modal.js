import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onAccept, children }) => {
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setModalContent(children);
  }, [children]);

  const closeModal = () => {
    setModalContent(null);
    onAccept();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {modalContent}
        <button className="accept-button" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
