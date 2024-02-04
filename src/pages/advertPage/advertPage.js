import { useNavigate, useParams } from 'react-router';
import Content from '../../components/layout/Content';
import { useEffect, useState } from 'react';
import { deleteOneAdvert, getOneAdvert } from '../../components/auth/service';
import ModalQuestion from '../../components/tools/ModalQuestion';
import Modal from '../../components/tools/Modal';
import './advertPage.css';
import { useDispatch } from 'react-redux';
import { getAdDetails, deleteAd } from '../../store/actions';

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState([]);
  const [isFetching, setIsFeching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const defaultPhotoUrl = '/logo512.png';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ad = await getOneAdvert(params.advertId);
        setAd(ad);
        console.log(ad);
        dispatch(getAdDetails(ad));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate('/404');
        }
      }
    };

    fetchData();
  }, [dispatch, navigate, params.advertId]);

  const date = new Date(ad.createdAt);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formatedDate = `${day < 10 ? '0' + day : day}/${
    month < 10 ? '0' + month : month
  }/${year} ${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`;

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
      console.log(params.advertId);
      dispatch(deleteAd(params.advertId));
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
    <Content title="Tu anuncio">
      <div className="advert-header">
        <div className="advert-name-page">{ad.name}</div>
        <div className="advert-photo-page">
          <img
            src={ad.photo || defaultPhotoUrl}
            alt={ad.name}
            className="advert-image-page"
          />
        </div>
      </div>
      <div className="advert-details-page">
        <div>
          <div className="advert-sale" style={{ display: 'inline-block' }}>
            {showSaleCode(ad.sale)}
          </div>
          <div className="advert-price" style={{ display: 'inline-block' }}>
            {ad.price}€
          </div>
        </div>
        <div>
          <div className="advert-tags" style={{ display: 'inline-block' }}>
            {ad.tags && ad.tags.length > 0 ? ad.tags.join(', ') : ''}
          </div>
          <div className="advert-date" style={{ display: 'inline-block' }}>
            {formatedDate}
          </div>
        </div>
        <button data-testid="deleteButton" onClick={handleDeleteClick}>
          {isFetching ? 'Deleting...' : 'Delete Ad'}
        </button>
      </div>
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
