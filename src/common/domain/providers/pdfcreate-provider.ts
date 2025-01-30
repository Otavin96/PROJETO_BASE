import { TDocumentDefinitions } from 'pdfmake/interfaces'

export interface PdfCreateProvider {
  createPdf(columnsTitle: string[], data: any[], title: string): Promise<void>
}
