import React from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

// import { Container } from './styles';

function EditContact() {
  return (
    <>
      <PageHeader title="Editar Christofer Assis" />
      <ContactForm buttonLabel="Salvar alterações" />
    </>
  );
}

export default EditContact;
