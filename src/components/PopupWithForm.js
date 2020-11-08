import React from 'react';
import './PopupWithForm.css';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    if (!props.name || !props.title || !props.onClose) {
      console.error('PopupWithForm requires `title`, `onClose` and `name` props.');
    }
  }

  render() {
    return (
      <div className={`popup popup-editor popup-editor_${this.props.name} ${this.props.isOpen && 'popup_opened'}`} onClick={(e) => e.target === e.currentTarget && this.props.onClose()}>
      <div className="popup__editor-container">
        <form className="editor" name={`editor_${this.props.name}`} noValidate>
          <p className="editor__title">{this.props.title}</p>
          {this.props.children}
          <button className="popup__btn-close editor__btn-close hover-breathing hover-breathing_deep" type="button" onClick={this.props.onClose}></button>
        </form>
      </div>
    </div>
    )
  }
}

export default PopupWithForm;
