import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props)  {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function resetForm() {
    setName('');
    setLink('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const card = {name, link}
    resetForm();
    props.onAddPlace(card);

  }

  return (
    <PopupWithForm
      name="image-adder"
      title="Новое место"
      buttonTextNormal="Создать"
      buttonTextProgress="Создаю..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <input onChange={handleChangeName} value={name} className="editor__input editor__input_display-name" type="text" name="display-name" data-error-element-id="editor_image-adder__display-name-error" placeholder="Название" required maxLength="30" minLength="1" />
      <span className="editor__error editor__error_hidden" id="editor_image-adder__display-name-error"> </span>
      <input onChange={handleChangeLink} value={link} className="editor__input editor__input_url" type="url" name="image-url" data-error-element-id="editor_image-adder__image-url-error" required placeholder="Ссылка на картинку" />
      <span className="editor__error editor__error_hidden" id="editor_image-adder__image-url-error"> </span>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
