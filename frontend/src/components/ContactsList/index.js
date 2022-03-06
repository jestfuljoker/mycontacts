import React from 'react';
import { Container, Header, ListContainer, Card } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>
        <a href="/#">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Table sort by name" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Christofer Assis</strong>
              <small>instagram</small>
            </div>
            <span>chris.f.assis18@gmail.com</span>
            <span>(11) 99330-3722</span>
          </div>
          <div className="actions">
            <a href="\">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Delete icon" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Christofer Assis</strong>
              <small>instagram</small>
            </div>
            <span>chris.f.assis18@gmail.com</span>
            <span>(11) 99330-3722</span>
          </div>
          <div className="actions">
            <a href="\">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Delete icon" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Christofer Assis</strong>
              <small>instagram</small>
            </div>
            <span>chris.f.assis18@gmail.com</span>
            <span>(11) 99330-3722</span>
          </div>
          <div className="actions">
            <a href="\">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Delete icon" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
