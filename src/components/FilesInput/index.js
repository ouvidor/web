import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import api from '../../services/api';

export default function FilesInput({ onChange, name, label }) {
  const [files, setFiles] = useState([]);

  FilesInput.defaultProps = {
    label: undefined,
    onChange: (fieldName, values) => {
      setFiles(values);
    },
    onBlur: () => {},
    value: undefined,
  };

  async function handleUpload(acceptedFiles) {
    const filesIds = [];
    acceptedFiles.forEach(async file => {
      const data = new FormData();

      data.append('file', file);
      /**
       * Fazer upload do arquivo e pegar o id que o arquivo recebeu no banco de dados
       */
      const response = await api.post(`/files`, data);
      filesIds.push(response.data.id);
    });

    setFiles(acceptedFiles);

    onChange(name, filesIds);
  }

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Dropzone onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px dotted red' }}>
            <input {...getInputProps()} id={name} />
            {files.length <= 0 ? (
              <p>
                Arraste arquivos ou clique aqui para fazer o upload de arquivos
              </p>
            ) : (
              files.map(file => <p>{file.name}</p>)
            )}
          </div>
        )}
      </Dropzone>
    </>
  );
}

FilesInput.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
