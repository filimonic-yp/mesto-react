import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import api from '../utils/APIExtension';
import {CurrentUserContext, defaultUser} from '../contexts/CurrentUserContext';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined,
      currentUser: defaultUser,
      cards: [],
    }

  }

  componentDidMount() {
    Promise.all([
      api
        .getMe()
        .then(data => this.setState({currentUser: data })),
      api
        .getInitialCards()
        .then((data) => this.updateCards(data))
      ])
      .catch(e => console.error('Error', e));
  }

  handleEditAvatarClick = () => this.setState({isEditAvatarPopupOpen: true});

  handleEditProfileClick = () => this.setState({isEditProfilePopupOpen: true});

  handleAddPlaceClick = () => this.setState({isAddPlacePopupOpen: true});

  handleCardClick = (card) => this.setState({selectedCard: card});

  handleCardLike = (likedCard) => {
    console.log('hcl', likedCard)
    const isLiked = likedCard.likes.some(likedUser => likedUser._id === this.state.currentUser._id);
    (isLiked
      ? api.dislikeCard(likedCard._id)
      : api.likeCard(likedCard._id))
      .then(newCard => this.updateCards(this.state.cards.map( card => card._id === newCard._id ? newCard : card )))
      .catch(e => console.error('Unable to process like', e));
  }

  handleCardDelete = (deletedCard) => {
    api
      .deleteCard(deletedCard._id)
      .then(this.setState({cards: this.state.cards.filter(card => deletedCard._id !== card._id)}))
      .catch(e => console.error('Unable to delete card', e));
  }

  updateCards = (cards) => {
    this.setState({
      cards:cards,
    })
  }



  handleUpdateUser = (user) => {
    this.closeAllPopups();
    api
      .updateMe(user)
      .then(newUserData => this.setState({currentUser: newUserData}))
      .catch(e => console.error('Error updating user', e));
  }

  handleUpdateAvatar = (avatar) => {
    this.closeAllPopups();
    api
      .setAvatar(avatar)
      .then(newUserData => this.setState({currentUser: newUserData}))
      .catch(e => console.error('Error updating user avatar', e));
  }

  handleAddPlaceSubmit = (place) => {
    this.closeAllPopups();
    api
      .sendCard(place)
      .then(newCard => this.setState({cards: [newCard, ...this.state.cards]}))
      .catch(e => console.error('Error adding card', e));
  }

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
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Main
          onEditAvatar = {this.handleEditAvatarClick}
          onEditProfile = {this.handleEditProfileClick}
          onAddPlace = {this.handleAddPlaceClick}
          onCardClick = {this.handleCardClick}
          onCardLike = {this.handleCardLike}
          onCardDelete = {this.handleCardDelete}
          cards = {this.state.cards}
        />
      </CurrentUserContext.Provider>

      <CurrentUserContext.Provider value={this.state.currentUser}>
        <EditProfilePopup
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser}
        />
      </CurrentUserContext.Provider>

      <CurrentUserContext.Provider value={this.state.currentUser}>
        <EditAvatarPopup
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
          />
      </CurrentUserContext.Provider>

      <AddPlacePopup
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onAddPlace={this.handleAddPlaceSubmit}
      />

      <ImagePopup isOpen={!!this.state.selectedCard} card={this.state.selectedCard} onClose={this.closeAllPopups}/>

      <PopupWithForm
        name="confirmer"
        title="Вы уверены?"
        buttonTextNormal="Да"
        buttonTextProgress="Удаляю..."
        isOpen={false}
        onClose={this.closeAllPopups}>
      </PopupWithForm>

      <Footer />

    </div>
    );
  }
}

export default App;
