import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import FileList from '../../FileList';
import { Container, InputLabel } from './styles';

function FilesInput({ name, label }) {
  const [files, setFiles] = useState([]);
  const { register } = useFormContext();

  function handleInputFiles(acceptedFiles) {
    setFiles(
      Array.from(acceptedFiles).map(acceptedFile =>
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      )
    );
  }

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <InputLabel htmlFor="file">
        <div>
          <input
            ref={register}
            name={name}
            id="file"
            type="file"
            accept="*"
            multiple
            onChange={event => handleInputFiles(event.target.files)}
          />
          {files.length ? (
            <FileList files={files} />
          ) : (
            <p>
              Arraste arquivos ou clique aqui para fazer o upload de arquivos
            </p>
          )}
        </div>
      </InputLabel>
    </Container>
  );
}

FilesInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

FilesInput.defaultProps = {
  label: undefined,
};

export default FilesInput;
