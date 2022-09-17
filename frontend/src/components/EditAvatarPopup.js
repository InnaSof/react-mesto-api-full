import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const userAvatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(userAvatarRef.current.value);
  }

  React.useEffect(() => {
    userAvatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      formName="form-avatar"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    <input className="popup__input popup__input_avatar-url"
      ref={userAvatarRef}
      type="url"
      placeholder="Ссылка на картинку"
      defaultValue=""
      name="avatar"
      id="avatar-input"
      required
    />
    <span id="avatar-input-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
