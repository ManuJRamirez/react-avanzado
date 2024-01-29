import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filters.css';
import Button from '../../components/tools/Button';
import { getTags } from '../auth/service';

const Filters = ({ handleFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 25000]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const handleApplyFilters = () => {
    handleFilter({
      name: nameFilter,
      sale: transactionFilter,
      price: priceFilter,
      tags: tagsFilter,
    });
  };

  const clearFilters = () => {
    setNameFilter('');
    setTransactionFilter('all');
    setPriceFilter([0, 25000]);
    setTagsFilter([]);
    handleFilter({
      name: '',
      sale: 'all',
      price: [0, 25000],
      tags: [],
    });
  };

  const handleRangePriceChange = value => {
    setPriceFilter(value);
  };

  const handleMinInputChange = event => {
    const minVal = parseInt(event.target.value);
    const newPriceFilter = [
      minVal > priceFilter[1] ? priceFilter[1] : minVal,
      priceFilter[1],
    ];
    setPriceFilter(newPriceFilter);
  };

  const handleMaxInputChange = event => {
    const maxVal = parseInt(event.target.value);
    const newPriceFilter = [
      priceFilter[0],
      maxVal < priceFilter[0] ? priceFilter[0] : maxVal,
    ];
    setPriceFilter(newPriceFilter);
  };

  return (
    <div className="filter-group">
      <label>
        Nombre:
        <input
          type="text"
          value={nameFilter}
          onChange={event => setNameFilter(event.target.value)}
        />
      </label>
      <br />
      <label>
        Tipo de transacción:
        <select
          value={transactionFilter}
          onChange={event => setTransactionFilter(event.target.value)}
        >
          <option value="all">Todos</option>
          <option value="Venta">Venta</option>
          <option value="Compra">Compra</option>
        </select>
      </label>
      <br />
      <label>Precio:</label>
      <div>
        <div>
          <label>Desde:</label>
          <input
            type="number"
            value={priceFilter[0]}
            min={0}
            max={25000}
            onChange={handleMinInputChange}
          />
        </div>
        <div>
          <label>Hasta:</label>
          <input
            type="number"
            value={priceFilter[1]}
            min={0}
            max={25000}
            onChange={handleMaxInputChange}
          />
        </div>
        <Slider
          min={0}
          max={25000}
          range
          value={priceFilter}
          onChange={handleRangePriceChange}
        />
      </div>
      <br />
      <label>
        Tags:
        <select
          multiple
          value={tagsFilter}
          onChange={e =>
            setTagsFilter(
              Array.from(e.target.selectedOptions, option => option.value),
            )
          }
        >
          {Array.isArray(tags) &&
            tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
        </select>
      </label>
      <br />
      <div className="filter-buttons">
        <Button onClick={handleApplyFilters}>Aplicar filtros</Button>
        <Button onClick={clearFilters}>Borrar filtros</Button>
      </div>
    </div>
  );
};

export default Filters;
