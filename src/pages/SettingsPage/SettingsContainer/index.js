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
import api from '../../../services/api';

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

  async function getItemFromAPI(url) {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get(url);
      setItems(data);
      setLoading(false);
      setError(false);
    } catch (err) {
      toast.error(`Ocorreu um erro na busca por ${url}`);
      setError(true);
      setLoading(false);
    }
  }

  async function refreshList() {
    const { data } = await api.get(urlPath);
    setItems(data);
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
                urlPath={urlPath}
                refreshList={refreshList}
              />
              {items &&
                items.map(item => (
                  <SettingsItem
                    item={item}
                    key={item.id}
                    email={email}
                    urlPath={urlPath}
                    refreshList={refreshList}
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
