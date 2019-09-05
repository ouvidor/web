/**
 * Componente para adicionar uma Tag
 * Esse componente renderiza um botão, que ao clicado renderiza um
 * input e um botão de conclusão, o botão de adicionar vira um botão
 * de exclusão quando estiver inserindo uma tag
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdClear, MdCheck } from 'react-icons/md';

import { Container, Button, Tag } from './styles';

export default function InputTag({ inputState, tags, setTags }) {
  const [isInputActive, setInputState] = useState(inputState);
  const [text, setText] = useState('');

  function handleAddTag(event) {
    const wasEnterPressed = event.key && event.key !== 'Enter';
    const isEmptyText = text.trim() === '';

    if (wasEnterPressed || isEmptyText) {
      return;
    }

    setTags([...tags, text]);
    setText('');
  }

  function handleRemoveTag(tag) {
    setTags(tags.filter(t => t !== tag));
  }

  return (
    <Container>
      {tags &&
        tags.map(tag => (
          <Tag key={tag} onDoubleClick={() => handleRemoveTag(tag)}>
            {tag}
          </Tag>
        ))}

      {isInputActive && (
        <>
          <input
            placeholder="Insira a tag"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleAddTag}
            autoFocus
          />

          <Button onClick={handleAddTag}>
            <MdCheck color="rgba(66, 147, 222)" />
          </Button>
        </>
      )}

      <Button
        isInputActive
        onClick={() => {
          setInputState(!isInputActive);
        }}
      >
        {isInputActive ? (
          <MdClear color="#d84242" />
        ) : (
          <MdAdd color="#2d2d2d" />
        )}
      </Button>
    </Container>
  );
}
InputTag.propTypes = {
  inputState: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  setTags: PropTypes.func,
};

InputTag.defaultProps = {
  inputState: false,
  tags: [],
  setTags: null,
};
