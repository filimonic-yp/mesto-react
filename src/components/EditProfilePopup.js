import React from 'react';
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(props)  {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTextNormal="Сохранить"
      buttonTextProgress="Сохраняю..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >

      <input onChange={handleChangeName} value={name} className="editor__input editor__input_display-name" type="text" autoComplete="name" data-error-element-id="editor_profile__display-name-error" placeholder="Имя" name="display-name" required maxLength="40" minLength="2" />
      <span className="editor__error editor__error_hidden" id="editor_profile__display-name-error"> </span>
      <input onChange={handleChangeDescription} value={description} className="editor__input editor__input_job" type="text" name="job" data-error-element-id="editor_profile__job-error" placeholder="Род занятий" required maxLength="200" minLength="2" />
      <span className="editor__error editor__error_hidden" id="editor_profile__job-error"> </span>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
