import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import MyMap from './Map';
import './style.css';
import { runInThisContext } from 'vm';
import API from "./api";

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
      modalSuccess: false,
      modalFail: false,
      name: '',
      latdd83: '',
      londd83: '',
    };
    this.sendPin = this.sendPin.bind(this);
    this.openModal = this.openModal.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeLat = this.changeLat.bind(this);
    this.changeLon = this.changeLon.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendPinSuccess = this.sendPinSuccess.bind(this);
    this.sendPinFail = this.sendPinFail.bind(this)
  }


  sendPin() {
    API.post('/platforms', { name: this.state.name, latdd83: this.state.latdd83, londd83: this.state.londd83 }).then(this.sendPinSuccess)
      .catch(this.sendPinFail);
  }

  changeName(event) {
    this.setState({ name: event.target.value });

  }
  changeLat(event) {
    this.setState({ latdd83: event.target.value });

  }
  changeLon(event) {
    this.setState({ londd83: event.target.value });
  }
  sendPinSuccess() {
    this.setState({ modalIsOpen: false, modalSuccess: true });
  }

  sendPinFail() {
    this.setState({ modalIsOpen: false, modalFail: true });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalSuccess: false, modalFail: false });
  }

  render() {
    return (
      <div className="all">
        <MyMap />

        <button className="btnadd" onClick={this.openModal}>
          +
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.sendPinSuccess}
          onRequestClose={this.closeModal}
          style={customStyles}
        >

          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <form>
            <p>Name</p>
            <input className="inputAdd"
              type="text" value={this.state.name} onChange={this.changeName}
            />
            <p>Latitude</p>
            <input className="inputAdd"
              type="tel" value={this.state.latdd83} onChange={this.changeLat}
            />
            <p>Longitude</p>
            <input className="inputAdd"
              type="tel" value={this.state.londd83} onChange={this.changeLon}
            />
          </form>
          <div className="btns">
            <button className="addButton" onClick={this.sendPin}>Adicionar</button>
            <button className="cancelButton" onClick={this.closeModal}>Cancelar</button>
          </div>

        </Modal>
        <Modal
          isOpen={this.state.modalSuccess}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h1>Pin adicionado com sucesso!</h1>
          <div className="singleBtn">
            <button className="closebtn" onClick={this.closeModal}>fechar</button>
          </div>

        </Modal>
        <Modal
          isOpen={this.state.modalFail}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h1>Erro ao adicionar pin.</h1>
          <div className="singleBtn">
            <button className="closebtn" onClick={this.closeModal}>fechar</button>
          </div>

        </Modal>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
