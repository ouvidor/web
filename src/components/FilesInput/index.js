import React, { useEffect, useState, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdAttachFile } from 'react-icons/md';

// import api from '../../services/api';
import { Container, ContainerPlaceholder } from './styles';

export default function FileInput() {
  // defaultValue começa vazio, portanto é assincrono
  const { defaultValue, registerField } = useField('file');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setFile(defaultValue && defaultValue.id);
      setPreview(defaultValue && defaultValue.url);
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // se não colocar isso aqui o unform fica atualizando toda hora
    // eslint-disable-next-line
  }, [ref.current, defaultValue]);

  async function handleChange(event) {
    const formData = new FormData();
    const { files } = event.target;

    // anexa os arquivos no FormData
    for (let index = 0; index < files.length; index++) {
      // se não tiver um arquivo nesse indice retorna
      if (!files[index]) return;

      formData.append('file', files[index]);
    }

    // const response = await api.post('files', formData);
    // const { id, url } = response.data;
    // setFile(id);
    // setPreview(url);
    console.log(formData);
  }

  // a label deve conter um input dentro
  // 'htmlFor' deve conter o 'id' do input
  return (
    <Container>
      <label htmlFor="file">
        {preview ? (
          <img src={preview} alt="file" />
        ) : (
          <ContainerPlaceholder>
            <div>
              <MdAttachFile size={40} color="rgba(0,0,0, 0.5)" />
              <span>Anexe arquivos</span>
            </div>
          </ContainerPlaceholder>
        )}

        <input
          type="file"
          id="file"
          accept="*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
          // permite varios arquivos
          multiple
        />
      </label>
    </Container>
  );
}
