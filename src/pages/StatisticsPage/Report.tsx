import React, { useState, useRef } from "react"
import { FormContext, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Api from "../../services/api"
import { ReportContainer, ReportTable, ReportForm } from "./styles"

interface ReportFormData {
  init: string
  end: string
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
  const tableRef = useRef<HTMLTableElement>(null)
  const form = useForm<ReportFormData>()

  async function handleFetchReport(data: ReportFormData) {
    console.log(data)
    const reportResponse = await Api.get<ReportData[]>({
      pathUrl: "/statistics",
      config: {
        params: {
          init: data.init,
          end: data.end,
          city: process.env.REACT_APP_CITY,
        },
      },
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

  async function handlePDF() {
    if (tableRef?.current !== null) {
      const canvas = await html2canvas(tableRef.current as HTMLElement)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      pdf.addImage(imgData, "PNG", 0, 0)
      pdf.save("relatorio.pdf")
    }
  }

  return (
    <ReportContainer>
      <section>
        <h1>Relatório</h1>
        <FormContext {...form}>
          <ReportForm onSubmit={form.handleSubmit(handleFetchReport)}>
            <div>
              <div>
                <label htmlFor="init">Data de inicio</label>
                <input name="init" type="date" ref={form.register} />
              </div>
              <div>
                <label htmlFor="init">Data de fim</label>
                <input name="end" type="date" ref={form.register} />
              </div>
            </div>
            <button type="submit">Gerar relatório</button>
            {report.length > 0 && (
              <button type="button" onClick={handlePDF}>
                Gerar pdf
              </button>
            )}
          </ReportForm>
        </FormContext>
      </section>
      <section>
        {report.length > 0 && (
          <ReportTable ref={tableRef}>
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
