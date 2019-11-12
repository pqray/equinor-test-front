import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import MyMap from './Map';
import './style.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: '99999999999999',
    transform: 'translate(-50%, -50%)'
  }
};

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      name: '',
      latdd83: '',
      londd83: '',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { markerPosition } = this.state;
    return (
      <div className="all">
        <MyMap />

        <button className="btnadd" onClick={this.openModal}>
          +
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          {/* <button onClick={this.closeModal}>close</button> */}
          <form>
            <p>Name</p>
            <input className="inputAdd"
              type="text" value="name"
            />
            <p>Latitude</p>
            <input className="inputAdd"
              type="text" value="latdd83"
            />
            <p>Longitude</p>
            <input className="inputAdd"
              type="text" value="londd83"
            />
          </form>
          <div className="btns">
            <button className="addButton">Adicionar</button>
            <button className="cancelButton" onClick={this.closeModal}>Cancelar</button>
          </div>

        </Modal>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
