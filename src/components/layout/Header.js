import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ReactComponent as Icon } from '../../assets/logo.svg';
import AuthButton from '../auth/AuthButton';

import './Header.css';

const navItemClassName = ({ isActive }) =>
  clsx('header-nav-item', { active: isActive });

function Header({ className }) {
  return (
    <header className={clsx('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={62} height={62} fill="red" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts" replace className={navItemClassName}>
          Anuncios
        </NavLink>
        <NavLink to="/adverts/new" replace className={navItemClassName}>
          Nuevo anuncio
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
