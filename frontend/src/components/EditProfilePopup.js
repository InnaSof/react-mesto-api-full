import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      formName="form-profile"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
    <input
      className="popup__input"
      type="text"
      placeholder="Имя"
      value={name || ''}
      onChange={handleChangeName}
      name="name"
      id="name-input"
      required=""
      minLength={2}
      maxLength={40}
    />
    <span id="name-input-error" className="popup__error" />
    <input
      className="popup__input"
      type="text"
      placeholder="Описание"
      value={description || ''}
      onChange={handleChangeDescription}
      name="description"
      id="job-input"
      required=""
      minLength={2}
      maxLength={200}
    />
    <span id="job-input-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
