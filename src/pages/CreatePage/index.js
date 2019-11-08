import React, { useState, useEffect } from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Background } from '../../styles';
import { Container, InputContainer } from './styles';
import Select from '../../components/Select';
import FilesInput from '../../components/FilesInput';
import api from '../../services/api';

export default function CreatePage() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O título é necessário'),
    description: Yup.string()
      .max(900, 'É permitido apenas 900 caracteres na descrição')
      .required('A descrição é necessária'),
    // apenas o id
    category: Yup.number().required('A categoria é necessária'),
    type: Yup.number().required('O tipo é necessário'),
    location: Yup.string(),
    files_id: Yup.number(),
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchFromAPI(path) {
    const response = await api.get(path);
    console.log(response.body);
    return response.body;
  }

  useEffect(() => {
    setTypes(fetchFromAPI('type'));
    setCategories(fetchFromAPI('category'));
  }, []);

  function handleSubmit(data) {
    // criar manifestação
    console.log(data);
  }

  return (
    <Background>
      <Container>
        <h1>Criar manifestação</h1>
        <Form onSubmit={handleSubmit} schema={validationSchema}>
          <InputContainer>
            <span>Título</span>
            <Input
              name="title"
              placeholder="Um título que sumarize a manifestação"
            />
          </InputContainer>
          <InputContainer>
            <span>Descrição</span>
            <Textarea
              name="description"
              placeholder="Descreva a manifestação"
              maxLength="900"
            />
          </InputContainer>
          <Select
            placeholder="Categorias das manifestações"
            name="category"
            label="Categorias"
            options={categories}
          />
          <Select
            placeholder="Tipos de manifestação"
            name="type"
            label="Tipos"
            options={types}
          />

          <FilesInput name="file_id" />

          <InputContainer>
            <span>Local</span>
            <Input name="location" placeholder="O local" />
          </InputContainer>

          <button type="submit">Criar manifestação</button>
        </Form>
      </Container>
    </Background>
  );
}
