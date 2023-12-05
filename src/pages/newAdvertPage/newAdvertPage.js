import Content from '../../components/layout/Content';
import Button from '../../components/tools/Button';
import { useEffect, useRef, useState } from 'react';
import './newAdvertPage.css';
import { postAdvert } from '../../components/auth/service';
import { useNavigate } from 'react-router';

const MIN_CHARACTERS = 5;

function NewAdvertPage() {
  const [formData, setFormData] = useState({
    name: '',
    sale: true,
    price: '',
    tags: [],
  });

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const counterRef = useRef(0);

  useEffect(() => {
    counterRef.current++;
  });

  const handleChange = event => {
    const { name, value, files, options } = event.target;
    if (name === 'photo') {
      setFormData({
        ...formData,
        photo: files[0],
      });
    } else if (name === 'sale') {
      const isForSale = value === 'Venta';
      setFormData({
        ...formData,
        sale: isForSale,
      });
    } else if (name === 'tags') {
      const selectedTags = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({
        ...formData,
        [name]: selectedTags,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const advert = await postAdvert(formData);
      navigate(`../${advert.id}`, { relative: 'path' });
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else {
        setIsFetching(false);
      }
    }
  };

  const buttonDisabled =
    formData.name.length < MIN_CHARACTERS ||
    !formData.name ||
    !formData.price ||
    !formData.tags.length ||
    isFetching;

  return (
    <Content title="Registra tu anuncio">
      <div className="newAdvertForm">
        <div>
          <label>
            Nombre del Artículo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={formData.price}
              min={0}
              max={25000}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Tipo de Transacción:
            <select name="sale" value={formData.sale} onChange={handleChange}>
              <option value="Venta">Venta</option>
              <option value="Compra">Compra</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Tags:
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              multiple
            >
              <option value="Lifestyle">Lifestyle</option>
              <option value="Mobile">Mobile</option>
              <option value="Motor">Motor</option>
              <option value="Work">Work</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Foto (opcional):
            <input type="file" name="photo" onChange={handleChange} />
          </label>
        </div>

        <div className="newTweetPage-footer">
          <Button
            type="submit"
            className="newTweetPage-submit"
            $variant="primary"
            disabled={buttonDisabled}
            onClick={handleSubmit}
          >
            ¡Registrar!
          </Button>
        </div>
      </div>
    </Content>
  );
}

export default NewAdvertPage;
