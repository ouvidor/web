/**
 * Componente de controle de paginas
 * Só tem a responsabilidade de exibir a página atual e passar a página
 * Atualiza o valor da página do component parent
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CircleSpinner } from 'react-spinners-kit';

import { Container, Button } from './styles';

export default function Pagination({ page, setPage, loading, maxPage }) {
  function handleNextPage() {
    if (maxPage <= page) return;
    setPage(page + 1);
  }

  function handlePrevPage() {
    if (page <= 1) return;
    setPage(page - 1);
  }

  return (
    <Container>
      <Button
        blocked={page <= 1 ? 1 : 0}
        type="button"
        onClick={handlePrevPage}
      >
        <MdChevronLeft />
      </Button>

      {loading ? (
        <CircleSpinner color="#0B76DA" size={20} />
      ) : (
        <span>
          <strong>{page}</strong>
        </span>
      )}
      <Button
        blocked={page >= maxPage ? 1 : 0}
        type="button"
        onClick={handleNextPage}
      >
        <MdChevronRight />
      </Button>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.bool,
  maxPage: PropTypes.number,
};

Pagination.defaultProps = {
  page: 1,
  setPage: () => {
    console.warn('setPage precisa ser passado para o componente Pagination');
  },
  loading: false,
  maxPage: 1,
};
