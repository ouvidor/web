import React from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Background } from '../../styles';
import { Container } from './styles';
import Select from '../../components/Select';
import FilesInput from '../../components/FilesInput';

export default function CreatePage() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O título é necessário'),
    description: Yup.string().required('A descrição é necessária'),
    // apenas o id
    category: Yup.number().required('A categoria é necessária'),
    type: Yup.number().required('O tipo é necessário'),
    location: Yup.string(),
    files_id: Yup.number(),
  });

  const types = [{ id: 1, title: 'Denuncia' }];
  const categories = [{ id: 1, title: 'Saneamento' }];

  function handleSubmit(data) {
    // criar manifestação
    console.log(data);
  }

  return (
    <Background>
      <Container>
        <h1>Criar manifestação</h1>
        <Form onSubmit={handleSubmit} schema={validationSchema}>
          <div>
            <span>Título</span>
            <Input
              name="title"
              placeholder="Um título que sumarize a manifestação"
            />
          </div>
          <div>
            <span>Descrição</span>
            <Textarea
              name="description"
              placeholder="Descreva a manifestação"
            />
          </div>
          <Select
            placeholder="Categorias das manifestações"
            name="category"
            options={categories}
          />
          <Select
            placeholder="Tipos de manifestação"
            name="type"
            options={types}
          />

          <FilesInput name="file_id" />

          <div>
            <span>Local</span>
            <Input name="location" placeholder="O local" />
          </div>

          <button type="submit">Criar manifestação</button>
        </Form>
      </Container>
    </Background>
  );
}
