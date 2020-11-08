import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined
    }
  }

  handleEditAvatarClick = () => this.setState({isEditAvatarPopupOpen: true});

  handleEditProfileClick = () => this.setState({isEditProfilePopupOpen: true});

  handleAddPlaceClick = () => this.setState({isAddPlacePopupOpen: true});

  handleCardClick = (card) => this.setState({selectedCard: card});

  closeAllPopups = () => {
    this.setState({
      isAddPlacePopupOpen: false,
      isEditProfilePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined
    });
  }

  render() {
    return (
      <div className="page__wrapper">

      <Header />

      <Main
        onEditAvatar = {this.handleEditAvatarClick}
        onEditProfile = {this.handleEditProfileClick}
        onAddPlace = {this.handleAddPlaceClick}
        onCardClick = {this.handleCardClick}
      />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonTextNormal="Сохранить"
        buttonTextProgress="Сохраняю..."
        isOpen={this.state.isEditProfilePopupOpen}
        onClose={this.closeAllPopups}>

        <input className="editor__input editor__input_display-name" type="text" autoComplete="name" data-error-element-id="editor_profile__display-name-error" placeholder="Имя" name="display-name" required maxLength="40" minLength="2" />
        <span className="editor__error editor__error_hidden" id="editor_profile__display-name-error"> </span>
        <input className="editor__input editor__input_job" type="text" name="job" data-error-element-id="editor_profile__job-error" placeholder="Род занятий" required maxLength="200" minLength="2" />
        <span className="editor__error editor__error_hidden" id="editor_profile__job-error"> </span>
      </PopupWithForm>

      <PopupWithForm
        name="image-adder"
        title="Новое место"
        buttonTextNormal="Создать"
        buttonTextProgress="Создаю..."
        isOpen={this.state.isAddPlacePopupOpen}
        onClose={this.closeAllPopups}>

        <input className="editor__input editor__input_display-name" type="text" name="display-name" data-error-element-id="editor_image-adder__display-name-error" placeholder="Название" required maxLength="30" minLength="1" />
        <span className="editor__error editor__error_hidden" id="editor_image-adder__display-name-error"> </span>
        <input className="editor__input editor__input_url" type="url" name="image-url" data-error-element-id="editor_image-adder__image-url-error" required placeholder="Ссылка на картинку" />
        <span className="editor__error editor__error_hidden" id="editor_image-adder__image-url-error"> </span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTextNormal="Сохранить"
        buttonTextProgress="Сохраняю..."
        isOpen={this.state.isEditAvatarPopupOpen}
        onClose={this.closeAllPopups}>

        <input className="editor__input editor__input_url" type="url" name="image-url" data-error-element-id="editor_image-adder__image-url-error" required placeholder="Ссылка на картинку аватара" />
        <span className="editor__error editor__error_hidden" id="editor_image-adder__image-url-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="confirmer"
        title="Вы уверены?"
        buttonTextNormal="Да"
        buttonTextProgress="Удаляю..."
        isOpen={false}
        onClose={this.closeAllPopups}>
      </PopupWithForm>

      <ImagePopup isOpen={!!this.state.selectedCard} card={this.state.selectedCard} onClose={this.closeAllPopups}/>

      <Footer />

    </div>
    );
  }
}

export default App;