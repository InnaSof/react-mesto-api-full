import React from 'react';
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
    
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form 
        className="auth__form" 
        onSubmit={handleSubmit}
        noValidate="" 
      >
        <input
          value={email} 
          className="auth__input"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          name="email"
          id="email-input"
          required=""
          minLength={2}
          maxLength={40}
        />
        <input
          value={password} 
          className="auth__input"
          type="password"
          placeholder="Пароль"
          onChange={handlePasswordChange} 
          name="password"
          id="password-input"
          required=""
          minLength={2}
          maxLength={40}
        />
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__text">
        Уже зарегистрированы?&nbsp;
        {<Link to="/signin" className="auth__login">Войти</Link>}
      </p>
    </section>
  )
}

export default Register;
