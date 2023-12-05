import { useNavigate, useParams } from 'react-router';
import Content from '../../components/layout/Content';
import { useEffect, useState } from 'react';
import { deleteOneAdvert, getOneAdvert } from '../../components/auth/service';
import ModalQuestion from '../../components/tools/ModalQuestion';
import Modal from '../../components/tools/Modal';

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState([]);
  const [isFetching, setIsFeching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const defaultPhotoUrl = '/logo512.png';

  useEffect(() => {
    getOneAdvert(params.advertId)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, params.advertId]);

  const date = new Date(ad.createdAt);
  const convertedDate = date.toString();

  const handleDeleteClick = async event => {
    event.preventDefault();
    openQuestionModal();
  };

  const handleConfirm = async () => {
    setIsModalQuestionOpen(false);
    setModalContent(null);
    try {
      setIsFeching(true);
      await deleteOneAdvert(params.advertId);
      setIsFeching(false);
      openSuccessModal();
    } catch (error) {
      openErrorModal();
    }
  };

  const handleCancel = () => {
    setIsModalQuestionOpen(false);
    setModalContent(null);
  };

  const handleAccept = () => {
    setIsModalOpen(false);
    setModalContent(null);
    navigate('/adverts');
  };

  const openQuestionModal = () => {
    setIsModalQuestionOpen(true);
    setModalContent(
      <>
        <h2>¿Estás seguro que quieres borrar el anuncio?</h2>
      </>,
    );
  };

  const openSuccessModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        <h2>Borrado exitoso</h2>
        <div>¡Has borrado el anuncio correctamente!</div>
      </>,
    );
  };

  const openErrorModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        <h2>Error</h2>
        <div>No se ha podido borrar el anuncio, intentalo de nuevo.</div>
      </>,
    );
  };

  return (
    <Content title={ad.name}>
      <div className="advert-photo">
        <img
          src={ad.photo || defaultPhotoUrl}
          alt={ad.name}
          className="advert-image"
        />
      </div>
      <div>{ad.price}€</div>
      <div> {showSaleCode(ad.sale)} </div>
      <div>{ad.tags}</div>
      <div>{convertedDate}</div>
      <button onClick={handleDeleteClick}>
        {isFetching ? 'Deleting...' : 'Delete Ad'}
      </button>
      <ModalQuestion
        isOpen={isModalQuestionOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        {modalContent}
      </ModalQuestion>
      <Modal isOpen={isModalOpen} onAccept={handleAccept}>
        {modalContent}
      </Modal>
    </Content>
  );
}

function showSaleCode(sale) {
  let res = 'Venta';
  if (sale === false) {
    res = 'Compra';
  }

  return res;
}

export default AdvertPage;
