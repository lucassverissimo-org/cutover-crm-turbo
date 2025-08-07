import { supabase } from '../supabase/client'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export async function exportAllDataToXLSX() {
  const workbook = XLSX.utils.book_new()
  const tables = ['contatos', 'plano_retorno', 'relacao_estorias', 'carga_dados', 'modelos']
  
  if (supabase == null){
    return;
  }

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*')
    if (error) {
      console.error(`Erro ao buscar dados da tabela ${table}:`, error)
      continue
    }

    if (data && data.length > 0) {
      const cleanedData = data.map(({ id, created_at, ...rest }) => rest)
      const worksheet = XLSX.utils.json_to_sheet(cleanedData, { cellStyles: true })

      const range = XLSX.utils.decode_range(worksheet['!ref']!)
      worksheet['!autofilter'] = { ref: XLSX.utils.encode_range(range) }
      
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C })
        const cell = worksheet[cellAddress]
        if (cell && typeof cell === 'object') {
          cell.s = {
            fill: { fgColor: { rgb: "C6EFCE" } },
            font: { bold: true },
          }
        }
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, table)
    }
  }

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'cutover-export.xlsx')
}
