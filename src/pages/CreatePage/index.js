import React, { useState, useEffect } from 'react';
import { useForm, FormContext, Controller } from 'react-hook-form';
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

  const form = useForm({
    validationSchema: createManifestationSchema,
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const typesResult = await Api.get({ pathUrl: 'type', error: false });
        const categoriesResult = await Api.get({
          pathUrl: 'category',
          error: false,
        });

        if (!typesResult || !categoriesResult) {
          throw Error;
        }

        setTypes(typesResult);
        setCategories(categoriesResult);
      } catch (err) {
        toast.error(
          'Não pôde pegar as opções de categorias e tipos de manifestações'
        );
      }
    };
    loadOptions();
  }, []);

  async function onSubmitClick(data) {
    /**
     * UPLOAD DE ARQUIVOS
     */
    const formData = new FormData();
    Array.from(data.files).forEach(file => {
      formData.append('file', file);
    });

    const files = await Api.post({ pathUrl: '/files', data: formData });

    if (!files || !files[0].id) {
      toast.error('Envio de arquivo falhou inesperadamente');
      return;
    }

    /**
     * UPLOAD DE MANIFESTAÇÃO
     */
    const formattedData = {
      ...data,
      files_id: files.map(file => file.id),
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

        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(onSubmitClick)}>
            <Field
              label="Título"
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

            <Controller
              as={<Select multiple options={categories} />}
              control={form.control}
              name="categories"
              label="Categories"
              placeholder="Categorias das manifestações"
            />

            <Controller
              as={<Select options={types} />}
              control={form.control}
              name="type"
              label="Tipos"
              placeholder="Tipos de manifestação"
            />

            <FilesInput name="files" label="Arquivos" />

            <Field label="Local" name="location" placeholder="O local" />

            <button type="submit">Criar manifestação</button>
          </form>
        </FormContext>
      </Container>
    </Background>
  );
}
