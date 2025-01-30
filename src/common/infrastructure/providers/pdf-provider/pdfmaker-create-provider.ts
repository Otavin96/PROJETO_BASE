import { PdfCreateProvider } from '@/common/domain/providers/pdfcreate-provider'
import PdfPrinter from 'pdfmake'
import fs from 'fs'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
export class PdfMakerCreateProvider implements PdfCreateProvider {
  async createPdf(
    columnsTitle: string[],
    data: any[][], // Garante que os dados sejam uma matriz bidimensional
    title: string,
  ): Promise<void> {
    if (!data || data.length === 0) {
      throw new Error('Nenhum dado disponível para gerar o PDF')
    }

    // Definição das fontes
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italic: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: title, style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: Array(columnsTitle.length).fill('*'), // Define larguras automaticamente
            body: [
              columnsTitle.map((title) => ({
                text: title,
                style: 'tableHeader',
              })), // Cabeçalho
              ...data.map((row) => row.map((cell) => String(cell))), // Converte os dados para string
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white',
          fillColor: '#4CAF50',
          alignment: 'center',
        },
      },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const writeStream = fs.createWriteStream('tabela.pdf')

    pdfDoc.pipe(writeStream)
    pdfDoc.end()

    writeStream.on('finish', () => {
      console.log('PDF gerado com sucesso!')
    })
  }
}
