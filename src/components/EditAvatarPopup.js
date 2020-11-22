import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props)  {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }


  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTextNormal="Сохранить"
      buttonTextProgress="Сохраняю..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >

      <input ref={avatarRef} className="editor__input editor__input_url" type="url" name="image-url" data-error-element-id="editor_image-adder__image-url-error" required placeholder="Ссылка на картинку аватара" />
      <span className="editor__error editor__error_hidden" id="editor_image-adder__image-url-error"></span>
  </PopupWithForm>
  )

}

export default EditAvatarPopup;
