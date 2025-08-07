import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { supabase } from '../../supabase/client'
import { dataExtenso, dataFormatada } from '../../utils/formatarData'
import { Edit3, Trash2 } from 'lucide-react'

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
  onEditar?: (registro: any) => void
  onDeletar?: (registro: any) => void
  onExcluirMultiplos?: (ids: string[]) => void
}

const TabelaGenerica = forwardRef<TabelaGenericaRef, TabelaGenericaProps>(
  ({ tabela, colunas, onEditar, onDeletar, onExcluirMultiplos }, ref) => {
    const [registros, setRegistros] = useState<any[]>([])
    const [selecionados, setSelecionados] = useState<Set<string>>(new Set())

    const buscarDados = async () => {
      if (supabase == null) return
      const { data } = await supabase.from(tabela).select('*').order('created_at',{ascending:true})
      setRegistros(data || [])
      setSelecionados(new Set())
    }

    useImperativeHandle(ref, () => ({ recarregar: buscarDados }))
    useEffect(() => { buscarDados() }, [])

    const toggleSelecionado = (id: string, checked: boolean) => {
      const nova = new Set(selecionados)
      checked ? nova.add(id) : nova.delete(id)
      setSelecionados(nova)
    }

    const toggleTodos = (checked: boolean) => {
      if (checked) {
        setSelecionados(new Set(registros.map(r => r.id)))
      } else {
        setSelecionados(new Set())
      }
    }

    return (
      <div>
        <div className="flex justify-between mb-2 items-center">
          <button
            onClick={buscarDados}
            className="text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded"
          >
            🔄 Atualizar
          </button>
          {onExcluirMultiplos && selecionados.size > 0 && (
            <button
              onClick={() => onExcluirMultiplos(Array.from(selecionados))}
              className="flex justify-between items-center gap-2 text-sm px-3 py-1 rounded bg-red-100 text-black hover:bg-red-300 transition"
            >
                <Trash2 className="w-4 h-4 text-red-600" />  
                Excluir Selecionados ({selecionados.size})              
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700 text-left">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={registros.length > 0 && selecionados.size === registros.length}
                    onChange={(e) => toggleTodos(e.target.checked)}
                  />
                </th>
                {colunas.map(col => (
                  <th key={col.chave} className="p-3">{col.titulo}</th>
                ))}
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {registros.map((registro, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3 border-b">
                    <input
                      type="checkbox"
                      checked={selecionados.has(registro.id)}
                      onChange={(e) => toggleSelecionado(registro.id, e.target.checked)}
                    />
                  </td>
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
                      <td key={col.chave} className="p-3 border-b">{valor ?? '-'}</td>
                    )
                  })}
                  <td className="p-3 border-b space-x-2">
                    <button onClick={() => onEditar?.(registro)} title="Editar"><Edit3 className="w-4 h-4 text-blue-300" /></button>
                    <button onClick={() => onDeletar?.(registro)} title="Deletar"><Trash2 className="w-4 h-4 text-red-600" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)

export default TabelaGenerica
