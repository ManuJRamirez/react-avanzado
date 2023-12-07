import React from 'react';
import PropTypes from 'prop-types';

const Advert = ({ content, name, sale, price, tags, createdAt, photo }) => {
  const defaultPhotoUrl = '/logo512.png';

  return (
    <article
      className={`advert card ${
        sale ? 'advert-sale-bg' : 'advert-purchase-bg'
      }`}
    >
      <div className="card-content">
        <div className="advert-info">
          <span className="advert-name">{name}</span>
          <div className="advert-photo">
            <img
              src={photo || defaultPhotoUrl}
              alt={name}
              className="advert-image"
            />
          </div>
          <div>
            <div className="advert-sale" style={{ display: 'inline-block' }}>
              {sale ? 'Venta' : 'Compra'}
            </div>
            <div className="advert-price" style={{ display: 'inline-block' }}>
              {price} €
            </div>
          </div>
          <div className="advert-tags">{tags.join(', ')}</div>
          <time dateTime={createdAt}></time>
        </div>
        <div className="advert-text">{content}</div>
      </div>
    </article>
  );
};

Advert.propTypes = {
  name: PropTypes.string.isRequired,
  sale: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default Advert;
