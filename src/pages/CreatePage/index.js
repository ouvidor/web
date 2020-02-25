import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import { Background } from '../../styles';
import { Container } from './styles';
import Select from '../../components/Form/Select';
import Field from '../../components/Form/Field';
import FilesInput from '../../components/Form/FilesInput';
import Api from '../../services/api';
import { createManifestationSchema } from '../../validations';

export default function CreatePage() {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      setTypes(await Api.get({ pathUrl: 'type' }));
      setCategories(await Api.get({ pathUrl: 'category' }));
    };
    loadOptions();
  }, []);

  async function handleSubmit(data) {
    // montar a requisição de forma correta
    const formattedData = {
      ...data,
      type_id: data.type.id,
      categories_id: data.categories.map(category => category.id),
    };

    const manifestationData = await Api.post({
      pathUrl: '/manifestation',
      data: formattedData,
    });

    if (manifestationData) {
      toast.success(
        `Manifestação "${manifestationData.title}" criada com sucesso!`
      );
    }
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
          validationSchema={createManifestationSchema}
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
                value={values.type}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.type}
                touched={touched.type}
              />

              <FilesInput
                name="filesId"
                label="Arquivos"
                value={values.filesId}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />

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
