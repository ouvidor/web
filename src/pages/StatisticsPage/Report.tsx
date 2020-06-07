import React, { useState } from "react"
import { FormContext, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Api from "../../services/api"
import { ReportContainer, ReportTable } from "./styles"

interface ReportFormData {
  date: string
}

interface ReportData {
  accountable: string | null
  encerradas: string | number
  id: number
  semResposta: string | number
  title: string | null
}

interface FormattedReportData {
  id: number
  accountable: string
  total: number
  closed: number
  withoutAnswer: number
  secretary: string
}

const Report: React.FC = () => {
  const [report, setReport] = useState<FormattedReportData[]>([])

  const form = useForm<ReportFormData>()

  async function handleFetchReport(data: ReportFormData) {
    console.log(data)
    const reportResponse = await Api.get<ReportData[]>({
      pathUrl: "/statistics",
      config: { params: { city: process.env.REACT_APP_CITY, date: data.date } },
    })

    if (!reportResponse) {
      return
    }

    toast.success("Relatório gerado com sucesso!")

    const formattedReportData = reportResponse.data.map<FormattedReportData>(
      (reportData) => ({
        id: reportData.id,
        secretary: reportData.title || "-",
        accountable: reportData.accountable || "-",
        total: Number(reportData.encerradas) + Number(reportData.semResposta),
        withoutAnswer: Number(reportData.semResposta),
        closed: Number(reportData.encerradas),
      })
    )

    setReport(formattedReportData)
  }

  return (
    <ReportContainer>
      <section>
        <h1>Relatório</h1>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(handleFetchReport)}>
            <label htmlFor="date">Data </label>
            <input
              name="date"
              type="month"
              max={new Date().toISOString()}
              ref={form.register}
            />
            <button type="submit">Gerar relatório</button>
          </form>
        </FormContext>
      </section>
      <section>
        {report.length > 0 && (
          <ReportTable>
            <thead>
              <tr>
                <th>Secretarias municipais</th>
                <th>Total</th>
                <th>Sem resposta</th>
                <th>Respondidas</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {report.map((line) => (
                <tr key={line.id}>
                  <td>{line.secretary}</td>
                  <td>{line.total}</td>
                  <td>{line.closed}</td>
                  <td>{line.withoutAnswer}</td>
                  <td>{line.accountable}</td>
                </tr>
              ))}
            </tbody>
          </ReportTable>
        )}
      </section>
    </ReportContainer>
  )
}

export default Report
