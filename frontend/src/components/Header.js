import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип"
      />
      <nav className="header__menu">
        <Switch>
          <Route exact path='/'>
            <p className="header__info-email">{email}</p>
            <Link to='/signin' className='header__link' onClick={onSignOut}>Выйти</Link>
          </Route>
          <Route path='/signin'>
            <Link to='/signup' className='header__link'>Регистрация</Link>
          </Route>
          <Route path='/signup'>
            <Link to='/signin' className='header__link'>Войти</Link>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
