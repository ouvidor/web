/**
 * Componente de controle de paginas
 * Só tem a responsabilidade de exibir a página atual e passar a página
 * Atualiza o valor da página do component parent
 */
import React from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { CircleSpinner } from "react-spinners-kit"

import { Container, Button } from "./styles"

type Props = {
  page?: number
  setPage(number: number): void
  loading?: boolean
  maxPage?: number
}

export default function Pagination({
  page = 1,
  setPage,
  loading = false,
  maxPage = 1,
}: Props) {
  function handleNextPage() {
    if (maxPage <= page) return
    setPage(page + 1)
  }

  function handlePrevPage() {
    if (page <= 1) return
    setPage(page - 1)
  }

  return (
    <Container>
      <Button blocked={page <= 1} type="button" onClick={handlePrevPage}>
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
  )
}
