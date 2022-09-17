import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <button
              type="button"
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-wrap">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
                aria-label="Редактировать"
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
            aria-label="Добавить"
          />
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </section>
      </main>
  );
}

export default Main;