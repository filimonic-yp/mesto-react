import React from 'react';
import Card from './Card';
import api from '../utils/APIExtension';
import EmptyImageUrl from '../utils/EmptyImageUrl';


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: EmptyImageUrl,
      cards: [],
    }
  }

  componentDidMount() {
    api
      .getMe()
      .then((data) => this.updateMe(data))
      .then(() => api.getInitialCards())
      .then((data) => this.updateCards(data))
      .catch((e) => console.log(e));
  }

  updateMe = ({name, about, avatar}) => {
    this.setState({
      userName: name,
      userDescription: about,
      userAvatar: avatar
    })
  }

  updateCards = (cards) => {
    this.setState({
      cards:cards,
    })
  }

  render() {
    return (
      <main className="main page__margin-wrapper">

        <section className="profile">
          <div className="profile__avatar-box">
            <img className="profile__avatar" alt={`${this.state.userName}, ${this.state.userDescription}`} src={this.state.userAvatar} />
            <button className="profile__btn-set-avatar" type="button" onClick={this.props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__display-name-wrapper">
              <h1 className="profile__display-name">{this.state.userName}</h1>
              <button className="profile__btn-edit hover-breathing hover-breathing_deep" type="button" onClick={this.props.onEditProfile}></button>
            </div>
            <p className="profile__job">{this.state.userDescription}</p>
          </div>
          <button className="profile__btn-add hover-breathing hover-breathing_deep" type="button" onClick={this.props.onAddPlace}></button>
        </section>

        <ul className="cards">
          {this.state.cards.map( (card) =>
            <Card
              key={card._id}
              card={card}
              onClick={() => this.props.onCardClick(card)}
            />
          )}
        </ul>

      </main>
    );
  }

}

export default Main;
