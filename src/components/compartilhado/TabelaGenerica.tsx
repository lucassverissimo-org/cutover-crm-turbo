import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { supabase } from '../../supabase/client'
import { dataExtenso, dataFormatada } from '../../utils/formatarData'

export type TabelaGenericaRef = {
  recarregar: () => void
}

export interface Coluna {
  chave: string
  titulo: string
  tipo?: 'texto' | 'data' | 'area'
}

interface TabelaGenericaProps {
  tabela: string
  colunas: Coluna[]
}

const TabelaGenerica = forwardRef<TabelaGenericaRef, TabelaGenericaProps>(({ tabela, colunas }, ref) => {
  const [registros, setRegistros] = useState<any[]>([])

  const buscarDados = async () => {
    if (supabase == null) return
    const { data } = await supabase.from(tabela).select('*')
    setRegistros(data || [])
  }

  useImperativeHandle(ref, () => ({ recarregar: buscarDados }))
  useEffect(() => { buscarDados() }, [])

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={buscarDados}
          className="text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded"
        >
          🔄 Atualizar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              {colunas.map(col => (
                <th key={col.chave} className="p-3">{col.titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {registros.map((registro, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {colunas.map(col => {
                  const valor = registro[col.chave]
                  if (col.tipo === 'data' && typeof valor === 'string') {
                    return (
                      <td key={col.chave} className="p-3 border-b">
                        <span title={dataExtenso(valor)}>{dataFormatada(valor)}</span>
                      </td>
                    )
                  }
                  return (
                    <td key={col.chave} className="p-3 border-b">
                      {valor ?? '-'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default TabelaGenerica
