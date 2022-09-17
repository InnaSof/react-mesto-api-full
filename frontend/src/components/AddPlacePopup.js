import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) { 
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  React.useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
    <input
      className="popup__input"
      type="text"
      placeholder="Название"
      value={name}
      onChange={handleChangeName}
      name="card-name"
      id="card-input"
      required=""
      minLength={2}
      maxLength={30}
    />
    <span id="card-input-error" className="popup__error" />
    <input
      className="popup__input"
      type="url"
      placeholder="Ссылка на картинку"
      value={link}
      onChange={handleChangeLink}
      name="card_url"
      id="link-input"
      required=""
    />
    <span id="link-input-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
