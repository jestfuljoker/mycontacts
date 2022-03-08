import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo</h1>
        <p>Conteudo</p>

        <Footer>
          <button className="cancel-button" type="button">
            Cancelar
          </button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

export default Modal;
