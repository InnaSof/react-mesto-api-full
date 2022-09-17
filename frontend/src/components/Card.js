import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden' }`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : '' }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
      <li className="element">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
        <img className="element__image"
             onClick={handleClick}
             src={card.link}
             alt={card.name}
        />
        <div className="element__card">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Лайк"
              onClick={handleLikeClick}
            />
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </li>
  );
}

export default Card;