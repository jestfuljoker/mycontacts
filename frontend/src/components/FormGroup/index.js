import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';

function FormGroup({ children }) {
  return <Container>{children}</Container>;
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormGroup;
