import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Api from '../../../services/api';
import FileList from '../../FileList';
import { Container, ContainerPlaceholder } from './styles';

function FilesInput({ onChange, name, label }) {
  const [files, setFiles] = useState([]);

  // async function handleUpload(acceptedFiles) {
  //   const formData = new FormData();
  //   acceptedFiles.forEach(acceptedFile => {
  //     formData.append('file', acceptedFile);
  //   });

  //   const uploadedFiles = await Api.post({ pathUrl: 'files', data: formData });
  //   console.log(uploadedFiles);
  //   onChange(name, uploadedFiles.map(file => file.id));
  //   setFiles(uploadedFiles);
  // }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {console.log(files)}
        {files.length ? (
          <FileList files={files} />
        ) : (
          <ContainerPlaceholder>
            Arraste arquivos ou clique aqui para fazer o upload de arquivos
          </ContainerPlaceholder>
        )}
      </div>
    </Container>
  );
}

FilesInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

FilesInput.defaultProps = {
  label: undefined,
};

export default FilesInput;
