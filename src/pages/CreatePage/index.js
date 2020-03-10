import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  const [isUploading, setUploading] = useState(false);

  const { register, handleSubmit, control, errors } = useForm({
    validationSchema: createManifestationSchema,
  });

  useEffect(() => {
    const loadOptions = async () => {
      setTypes(await Api.get({ pathUrl: 'type' }));
      setCategories(await Api.get({ pathUrl: 'category' }));
    };
    loadOptions();
  }, []);

  async function onSubmit(data) {
    setUploading(true);

    while (isUploading === true) {
      console.log('Uploading files');
    }

    // montar a requisição de forma correta
    const formattedData = {
      ...data,
      files_id: data.filesId,
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Título"
            type="text"
            name="title"
            placeholder="Um título que sumarize a manifestação"
            register={register}
            errors={errors}
          />
          <Field
            label="Descrição"
            component="textarea"
            name="description"
            placeholder="Descreva a manifestação"
            maxLength="900"
            register={register}
            errors={errors}
          />
          <Controller
            as={<Select multiple />}
            name="categories"
            label="Categories"
            placeholder="Categorias das manifestações"
            options={categories}
            control={control}
            errors={errors}
          />

          <Controller
            as={<Select multiple />}
            name="type"
            label="Tipos"
            placeholder="Tipos de manifestação"
            options={types}
            control={control}
            errors={errors}
          />

          <Controller
            as={<FilesInput />}
            name="filesId"
            control={control}
            errors={errors}
          />

          {/* <FilesInput
            isUploading={isUploading}
            setUploading={setUploading}
            name="filesId"
            label="Arquivos"
            value={values.filesId}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          /> */}

          <Field
            label="Local"
            type="text"
            name="location"
            placeholder="O local"
            register={register}
            errors={errors}
          />

          <button type="submit">Criar manifestação</button>
        </form>
      </Container>
    </Background>
  );
}
