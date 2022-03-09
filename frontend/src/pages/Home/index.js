import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar pelo nome" />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
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
            <Link to="edit/123">
              <img src={edit} alt="Edit icon" />
            </Link>

            <button type="button">
              <img src={trash} alt="Delete icon" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

export default Home;
