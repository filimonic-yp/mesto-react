import React from 'react';
import './Card.css';

export default function Card(props)
{
  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={props.onClick}/>
      <p className="card__caption">{props.card.name}</p>
      <div className="card__like-control">
        <button className={`card__btn-like hover-breathing hover-breathing_deep ${props.card.isLikedByMe && 'card__btn-like_liked'}`} type="button"></button>
        <p className="card__like-counter">{props.card.likeCount}</p>
      </div>
      <button className={`card__btn-remove hover-breathing hover-breathing_deep ${!props.card.isOwnedByMe && 'card__btn-remove_hidden'}`} type="button"></button>
    </li>
  );
}
