import React from 'react';
import PropTypes from 'prop-types';
import { MdInsertDriveFile } from 'react-icons/md';

import { ListContainer, ListItem } from './styles';

function File({ file }) {
  const extension = file.path.split('.').pop();
  // checa a extensão do arquivo é png, gif, jpg ou jpeg
  if (extension.match(/(png|gif|jpe?g)$/)) {
    return (
      <ListItem>
        <img src={file.preview} alt={file.name} />
      </ListItem>
    );
  }
  // documento comum
  return (
    <ListItem>
      <div>
        <MdInsertDriveFile />
        <p>{file.name}</p>
      </div>
    </ListItem>
  );
}

const FileList = ({ files }) => (
  <ListContainer>
    <ul>
      {files.length && files.map(file => <File file={file} key={file.id} />)}
    </ul>
  </ListContainer>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
};

File.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
};

export default FileList;
