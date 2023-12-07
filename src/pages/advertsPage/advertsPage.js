import Button from '../../components/tools/Button';
import { useEffect, useState } from 'react';
import './advertsPage.css';
import { Link } from 'react-router-dom';
import { getAllAdverts } from '../../components/auth/service';
import Advert from '../../components/layout/Advert';
import Content from '../../components/layout/Content';
import Filters from '../../components/tools/Filters';

const EmptyList = () => (
  <div className="no-results">
    <p>No hay anuncios disponibles</p>
    <Button as={Link} to="/adverts/new" $variant="primary">
      Crear anuncio
    </Button>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    getAllAdverts().then(adverts => {
      setAdverts(adverts);
      setFilteredAdverts(adverts);
      setNoResults(adverts.length === 0);
    });
  }, []);

  const handleFilter = filters => {
    let filtered = [...adverts];

    if (filters.name) {
      filtered = filtered.filter(ad =>
        ad.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }

    if (filters.sale) {
      if (filters.sale !== 'all') {
        filtered = filtered.filter(ad => {
          if (filters.sale === 'Venta') {
            return ad.sale === true;
          } else if (filters.sale === 'Compra') {
            return ad.sale === false;
          }
          return true;
        });
      }
    }

    if (filters.price[0] || filters.price[1]) {
      filtered = filtered.filter(ad => {
        const price = parseFloat(ad.price);
        if (filters.price[0] && price < filters.price[0]) return false;
        if (filters.price[1] && price > filters.price[1]) return false;
        return true;
      });
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(ad =>
        filters.tags.every(tag => ad.tags.includes(tag)),
      );
    }

    setFilteredAdverts(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <Content title="Anuncios disponibles">
      <div className="advertsPage">
        {noResults && adverts.length === 0 && <EmptyList />}
        {!noResults && (
          <>
            <div className="filters">
              <Filters handleFilter={handleFilter} />
            </div>
            {filteredAdverts.length === 0 && (
              <div className="no-results">
                No hay anuncios disponibles después del filtrado
              </div>
            )}
            {filteredAdverts.length > 0 && (
              <ul className="adverts-list">
                {filteredAdverts.map(({ id, ...advert }) => (
                  <li key={id}>
                    <Link to={`${id}`}>
                      <Advert {...advert} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </Content>
  );
}

export default AdvertsPage;
