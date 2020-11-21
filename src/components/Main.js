import React from 'react';
import Card from './Card';
import EmptyImageUrl from '../utils/EmptyImageUrl';
import {CurrentUserContext} from '../contexts/CurrentUserContext';




class Main extends React.Component {

  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: EmptyImageUrl,
    }
  }


  updateMe = ({name, about, avatar}) => {
    this.setState({
      userName: name,
      userDescription: about,
      userAvatar: avatar
    })
  }



  render() {
    return (
      <main className="main page__margin-wrapper">

        <section className="profile">
          <div className="profile__avatar-box">
            <img className="profile__avatar" alt={`${this.context.name}, ${this.context.about}`} src={this.context.avatar} />
            <button className="profile__btn-set-avatar" type="button" onClick={this.props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__display-name-wrapper">
              <h1 className="profile__display-name">{this.context.name}</h1>
              <button className="profile__btn-edit hover-breathing hover-breathing_deep" type="button" onClick={this.props.onEditProfile}></button>
            </div>
            <p className="profile__job">{this.context.about}</p>
          </div>
          <button className="profile__btn-add hover-breathing hover-breathing_deep" type="button" onClick={this.props.onAddPlace}></button>
        </section>

        <ul className="cards">
          {this.props.cards.map( (card) =>
            <Card
              key={card._id}
              card={card}
              onClick={() => this.props.onCardClick(card)}
              onCardLike={() => this.props.onCardLike(card)}
              onCardDelete={() => this.props.onCardDelete(card)}
            />
          )}
        </ul>

      </main>
    );
  }

}

export default Main;
