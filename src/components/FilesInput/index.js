import React, { useEffect, useState, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';

// import api from '../../services/api';
import { Container, ContainerPlaceholder } from './styles';

export default function BannerInput() {
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
    // senão colocar isso aqui o unform fica atualizando toda hora
    // eslint-disable-next-line
  }, [ref.current, defaultValue]);

  async function handleChange(event) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    // const response = await api.post('files', formData);
    // const { id, url } = response.data;
    // setFile(id);
    // setPreview(url);
    console.log(event.target.files);
  }

  // a label deve conter um input dentro
  // 'htmlFor' deve conter o 'id' do input
  return (
    <Container>
      <label htmlFor="file">
        <ContainerPlaceholder>
          <div>
            <MdPhotoCamera size={50} color="rgba(255,255,255, 0.4)" />
            <span>Envie um arquivo</span>
          </div>
        </ContainerPlaceholder>
        {preview && <img src={preview} alt="file" />}
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
