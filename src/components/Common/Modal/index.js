import React from 'react';

import './index.css';

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick = (e) => {
    this.props.onHide()
  }

  render() {
    console.log("this.props.show",this.props.show )

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" >
        <div className="mask" onClick={this.onClick}></div>
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;