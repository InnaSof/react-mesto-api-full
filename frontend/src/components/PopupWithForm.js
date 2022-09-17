import React from 'react';

function PopupWithForm({ name, isOpen, onClose, title, formName, onSubmit, children, submitText }) {
  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-btn"
            onClick={onClose}
            aria-label="Закрыть"
          />
          <h3 className="popup__title">{title}</h3>
          <form
            className="popup__form"
            name={formName}
            onSubmit={onSubmit}
            action="#"
            method="post"
            noValidate=""
            >
              {children}
            <button
              type="submit"
              className="popup__submit-btn"
              aria-label="Сохранить"
              >
                {submitText}
            </button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;