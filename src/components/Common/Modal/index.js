import React from 'react';

import './index.css';

class Modal extends React.Component {
  onClick = (e) => {
    this.props.onHide()
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal-backdrop" >
        <div className="modal-mask" onClick={this.onClick}></div>
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;