import React from 'react';

function Login({ onLogin }) {
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

    onLogin({
      email,
      password
    });
  }

  return(
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          value={email}
          className="auth__input" 
          type="email" 
          placeholder="Email" 
          onChange={handleEmailChange} 
          required
        />
        <input 
          value={password}
          className="auth__input"
          type="password" 
          placeholder="Пароль" 
          onChange={handlePasswordChange} 
          required
        />
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;