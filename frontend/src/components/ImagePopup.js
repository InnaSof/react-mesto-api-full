import React from 'react';

function ImagePopup({ card, onClose, name }) {

  return (
    <div className={`popup popup_type_${name} ${card.link && 'popup_opened'}`}>
      <div className="popup__image-card">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        />
        <img className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__image-name">{card.name} </p>
      </div>
    </div>
  );
}

export default ImagePopup;