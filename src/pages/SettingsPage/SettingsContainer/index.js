/**
 * Container retratil para editar os items do sistema
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { CircleSpinner } from 'react-spinners-kit';
import { MdClear } from 'react-icons/md';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { Container } from './styles';
import SettingsItem from './SettingsItem';
import Api from '../../../services/api';

export default function SettingsContainer({
  urlPath,
  email,
  title,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(data, isSaving) {
    // excluindo item
    if (!isSaving) {
      const responseData = await Api.delete({
        pathUrl: `${urlPath}/${data.id}`,
      });
      if (responseData) {
        toast.success(`Item "${responseData.title}" excluido com sucesso`);
        setItems(items.filter(item => item.id !== responseData.id));
      }
      return;
    }

    // cria um novo item
    if (!data.id) {
      const responseData = await Api.post({ pathUrl: `${urlPath}`, data });
      if (responseData) {
        toast.success(`Item "${responseData.title}" criado com sucesso`);
        setItems([responseData, ...items]);
      }
      return;
    }

    // atualizar um item
    const responseData = await Api.put({
      pathUrl: `${urlPath}/${data.id}`,
      data,
    });
    if (responseData) {
      toast.success(`Item "${responseData.title}" atualizado com sucesso`);
      setItems(
        items.map(item => {
          if (responseData.id === item.id) {
            return responseData;
          }
          return item;
        })
      );
    }
  }

  async function getItemFromAPI(url) {
    setLoading(true);
    setError(false);

    const data = await Api.get({ pathUrl: url });

    if (!data) {
      setLoading(false);
      setError(true);
      return;
    }
    setItems(data);
    setLoading(false);
    setError(false);
  }

  useEffect(() => {
    getItemFromAPI(urlPath);
  }, [urlPath]);

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {title}
          {isOpen ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </button>
      {isOpen && (
        <div>
          {error && (
            <div>
              <MdClear />
              Não conseguiu ter acesso
            </div>
          )}
          {loading && <CircleSpinner color="#000" />}
          {!loading && (
            <ul>
              <SettingsItem
                email={email}
                placeholder={placeholder}
                submitChange={handleSubmit}
              />
              {items &&
                items.map(item => (
                  <SettingsItem
                    item={item}
                    key={item.id}
                    email={email}
                    submitChange={handleSubmit}
                  />
                ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  );
}

SettingsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  urlPath: PropTypes.string.isRequired,
  email: PropTypes.bool,
  placeholder: PropTypes.string,
};

SettingsContainer.defaultProps = {
  email: null,
  placeholder: null,
};
