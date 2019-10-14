/**
 * Componente de controle de paginas
 * Só tem a responsabilidade de exibir a página atual e passar a página
 * Atualiza o valor da página do component parent
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CircleSpinner } from 'react-spinners-kit';

import { Container, Button } from './styles';

export default function Pagination({ page, setPage, loadingState, maxPage }) {
  const [isFirstPage, setIsFirstPage] = useState(page === 1);
  const [isLastPage, setIsLastPage] = useState(page === maxPage);

  function handleNextPage() {
    if (isLastPage) return;

    setPage(page + 1);

    if (page === maxPage) setIsLastPage(true);
    if (page > 1) setIsFirstPage(false);
  }

  function handlePrevPage() {
    if (isFirstPage) return;

    setPage(page - 1);

    if (page === 1) setIsFirstPage(true);
    if (page < maxPage) setIsLastPage(false);
  }

  return (
    <Container>
      <Button
        blocked={isFirstPage ? 1 : 0}
        type="button"
        onClick={handlePrevPage}
      >
        <MdChevronLeft />
      </Button>

      {loadingState ? (
        <CircleSpinner color="#0B76DA" size={20} />
      ) : (
        <span>
          <strong>{page}</strong>
        </span>
      )}
      <Button
        blocked={isLastPage ? 1 : 0}
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
  loadingState: PropTypes.bool,
  maxPage: PropTypes.number,
};

Pagination.defaultProps = {
  page: 1,
  setPage: () => {
    console.warn('setPage precisa ser passado para o componente Pagination');
  },
  loadingState: false,
  maxPage: 1,
};
