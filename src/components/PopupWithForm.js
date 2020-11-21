import React from 'react';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={`popup popup-editor popup-editor_${this.props.name} ${this.props.isOpen && 'popup_opened'}`} onClick={(e) => e.target === e.currentTarget && this.props.onClose()}>
      <div className="popup__editor-container">
        <form onSubmit={this.props.onSubmit} className="editor" name={`editor_${this.props.name}`} noValidate>
          <p className="editor__title">{this.props.title}</p>
          {this.props.children}
          <button className="editor__btn-submit hover-breathing hover-breathing_shallow" type="submit" name="submit" value="save-info">{this.props.buttonTextNormal}</button>
          <button className="popup__btn-close editor__btn-close hover-breathing hover-breathing_deep" type="button" onClick={this.props.onClose}></button>
        </form>
      </div>
    </div>
    )
  }
}

export default PopupWithForm;
