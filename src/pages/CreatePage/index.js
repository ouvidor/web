import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Background } from '../../styles';
import { Container } from './styles';
import Select from '../../components/Select';
import Field from '../../components/Field';
// import FilesInput from '../../components/FilesInput';
import api from '../../services/api';

export default function CreatePage() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O título é necessário'),
    description: Yup.string()
      .max(900, 'É permitido apenas 900 caracteres na descrição')
      .required('A descrição é necessária'),
    // apenas o id
    categories: Yup.array()
      .of(Yup.object().shape({ id: Yup.number(), title: Yup.string() }))
      .required('A categoria é necessária')
      .nullable(),
    type: Yup.object()
      .shape({ id: Yup.number(), title: Yup.string() })
      .required('O tipo é necessário')
      .nullable(),
    location: Yup.string(),
    files_id: Yup.number(),
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchFromAPI(pathUrl) {
    const { data } = await api.get(pathUrl);
    return data;
  }

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setTypes(await fetchFromAPI('type'));
        setCategories(await fetchFromAPI('category'));
      } catch (error) {
        toast.error('Não pôde buscar as opções de pesquisa do servidor');
      }
    };
    loadOptions();
  }, []);

  function handleSubmit(data) {
    // criar manifestação
    async function createManifestation() {
      // montar a requisição de forma correta
      const formattedData = {
        ...data,
        type_id: data.type.id,
        categories_id: data.categories.map(category => category.id),
      };
      try {
        const response = await api
          .post('/manifestation', formattedData)
          .catch(error => {
            toast.error(error.response.data.error);
          });

        if (response.data) {
          toast.success(
            `Manifestação "${response.data.title}" criada com sucesso!`
          );
        }
      } catch (err) {
        console.error(err);
      }
    }

    createManifestation();
  }

  return (
    <Background>
      <Container>
        <h1>Criar manifestação</h1>
        <Formik
          initialValues={{
            title: '',
            description: '',
            categories: [],
            type: null,
            location: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form>
              <Field
                label="Título"
                type="text"
                name="title"
                placeholder="Um título que sumarize a manifestação"
              />
              <Field
                label="Descrição"
                component="textarea"
                name="description"
                placeholder="Descreva a manifestação"
                maxLength="900"
              />
              <Select
                placeholder="Categorias das manifestações"
                name="categories"
                label="Categorias"
                options={categories}
                multiple
                onlyId
                value={values.categories}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.categories}
                touched={touched.categories}
              />

              <Select
                placeholder="Tipos de manifestação"
                name="type"
                label="Tipos"
                options={types}
                onlyId
                value={values.type}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.type}
                touched={touched.type}
              />

              {/* <FilesInput
                name="filesId"
                value={values.filesId}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              /> */}

              <Field
                label="Local"
                type="text"
                name="location"
                placeholder="O local"
              />

              <button type="submit">Criar manifestação</button>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}
