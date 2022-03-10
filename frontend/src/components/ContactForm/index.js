import PropTypes from 'prop-types';
import React, { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';

import { ButtonContainer, Form } from './styles';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function getErrorMessageByFieldName(fieldName) {
    return errors.find(error => error.field === fieldName)?.message;
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find(error => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors(prevState => [
        ...prevState,
        { field: 'email', message: 'E-mail inválido' },
      ]);
    } else {
      setErrors(prevState =>
        prevState.filter(error => error.field !== 'email'),
      );
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors(prevState => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors(prevState => prevState.filter(error => error.field !== 'name'));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ name, email, phone, category });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          onChange={handleNameChange}
          value={name}
          placeholder="Nome"
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          onChange={event => setPhone(event.target.value)}
          value={phone}
          placeholder="Telefone"
        />
      </FormGroup>

      <FormGroup>
        <Select
          onChange={event => setCategory(event.target.value)}
          value={category}
          placeholder="Categoria"
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
