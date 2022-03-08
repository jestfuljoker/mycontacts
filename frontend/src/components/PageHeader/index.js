import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import arrow from '../../assets/images/icons/arrow.svg';

import { Container } from './styles';

function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="Back to home" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
