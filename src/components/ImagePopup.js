import React from 'react';
import './ImagePopup.css';

class ImagePopup extends React.Component {
  render() {
    return (
      <div className={`popup popup-viewer ${this.props.isOpen && 'popup_opened'}`} onClick={(e) => e.target === e.currentTarget && this.props.onClose()}>
      <div className="viewer popup__viewer-container"  >
        <button className="popup__btn-close viewer__btn-close hover-breathing hover-breathing_deep" type="button" onClick={this.props.onClose}></button>
        <img className="viewer__image" src={this.props.card && this.props.card.link} alt={this.props.card && this.props.card.name} />
        <p className="viewer__title">{this.props.card && this.props.card.name}</p>
      </div>
    </div>
    )
  }
}

export default ImagePopup;
