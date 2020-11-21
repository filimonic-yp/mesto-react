import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


export default function Card(props)
{
  const currentUser = React.useContext(CurrentUserContext);
  const isLikedByMe = props.card.likes.some( user => user._id === currentUser._id  );
  const isOwnedByMe = props.card.owner._id === currentUser._id;
  //const isOwnedByMe = true;
  const likeCount = props.card.likes.length;

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={props.onClick}/>
      <p className="card__caption">{props.card.name}</p>
      <div className="card__like-control">
        <button className={`card__btn-like hover-breathing hover-breathing_deep ${isLikedByMe && 'card__btn-like_liked'}`} type="button" onClick={props.onCardLike}></button>
        <p className="card__like-counter">{likeCount}</p>
      </div>
      <button className={`card__btn-remove hover-breathing hover-breathing_deep ${!isOwnedByMe && 'card__btn-remove_hidden'}`} type="button" onClick={props.onCardDelete}></button>
    </li>
  );
}
