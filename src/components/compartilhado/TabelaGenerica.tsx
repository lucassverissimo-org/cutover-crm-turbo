import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { supabase } from '../../supabase/client'
import { dataExtenso, dataFormatada } from '../../utils/formatarData'
import { Edit3, RefreshCw, Trash2, ArrowLeftRight, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRelease } from '../../context/ReleaseContext'

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
    const { releaseSelecionada } = useRelease()
    const [showTransfer, setShowTransfer] = useState(false)
    const [eligibleReleases, setEligibleReleases] = useState<Array<any>>([])
    const [targetReleaseId, setTargetReleaseId] = useState<string>("")
    const [transfering, setTransfering] = useState(false)
    const buscarDados = async () => {
      if (supabase == null) return
      let query = supabase.from(tabela).select('*')

      if (tabela !== 'releases') {
        if (!releaseSelecionada?.id) { // sem release ainda, zera a tabela
          setRegistros([])
          setSelecionados(new Set())
          return
        }
        query = query.eq('id_release', releaseSelecionada.id)
      }

      query = query.order('created_at', { ascending: true })
      const { data } = await query
      setRegistros(data || [])
      setSelecionados(new Set())
    }
    useEffect(() => { buscarDados() }, [releaseSelecionada?.id, tabela])
    
    useImperativeHandle(ref, () => ({ recarregar: buscarDados }))
    useEffect(() => { buscarDados() }, [])

    useEffect(() => {
      if (!showTransfer) return
      const fetchReleases = async () => {
        if (!releaseSelecionada?.id) return
        const hoje = new Date()
        const yyyy = hoje.getFullYear()
        const mm = String(hoje.getMonth() + 1).padStart(2, '0')
        const dd = String(hoje.getDate()).padStart(2, '0')
        const hojeStr = `${yyyy}-${mm}-${dd}`

        // data_gmud é TEXT no seu schema. Se você salvar em 'YYYY-MM-DD', o gte funciona.
        const { data, error } = await supabase!
          .from('releases')
          .select('id, descricao, versao, patch, data_gmud')
          .neq('id', releaseSelecionada.id)
          .gte('data_gmud', hojeStr)
          .order('data_gmud', { ascending: true })

        if (error) {
          toast.error('Falha ao carregar releases para transferência')
          return
        }
        setEligibleReleases(data || [])
        setTargetReleaseId(data?.[0]?.id ?? "")
      }
      fetchReleases()
    }, [showTransfer, releaseSelecionada?.id])
    const transferir = async () => {
  if (!targetReleaseId) {
    toast.warn('Selecione a release de destino')
    return
  }
  if (!releaseSelecionada?.id) {
    toast.error('Release atual inválida')
    return
  }
  if (tabela === 'releases') {
    toast.warn('Esta tela não suporta transferência')
    return
  }

  setTransfering(true)
    try {
      // Busca todos os registros da tabela corrente vinculados à release atual
      const { data: rows, error: qErr } = await supabase!
        .from(tabela)
        .select('*')
        .eq('id_release', releaseSelecionada.id)

      if (qErr) throw qErr
      if (!rows || rows.length === 0) {
        toast.info('Nada para transferir')
        return
      }

      // Remove campos de identidade e ajusta a release de destino
      const payload = rows.map((r: any) => {
        const { id, created_at, id_release, ...rest } = r
        return { ...rest, id_release: targetReleaseId }
      })

      // Insert em lotes (caso tenha muita linha)
      const chunkSize = 500
      for (let i = 0; i < payload.length; i += chunkSize) {
        const chunk = payload.slice(i, i + chunkSize)
        const { error: iErr } = await supabase!.from(tabela).insert(chunk)
        if (iErr) throw iErr
      }

      toast.success('Transferência concluída')
      // mantém na página atual, não troca a release; apenas fecha modal
      setShowTransfer(false)
    } catch (e: any) {
      console.error(e)
      toast.error('Erro ao transferir dados')
    } finally {
      setTransfering(false)
    }
  }
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
            className="flex justify-between items-center gap-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded"
          >
            <RefreshCw size={20} /> Atualizar
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center gap-2"
            title="Transferir dados para outra release"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Transferir
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
        {showTransfer && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Transferir dados</h3>
                <button
                  onClick={() => setShowTransfer(false)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Selecionar release de destino (Data GMUD ≥ hoje)
                </label>
                <select
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-900"
                  value={targetReleaseId}
                  onChange={(e) => setTargetReleaseId(e.target.value)}
                >
                  {eligibleReleases.length === 0 && (
                    <option value="">Nenhuma release elegível</option>
                  )}
                  {eligibleReleases.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {`${r.versao ?? ''}${r.patch ? `.${r.patch}` : ''}`} — {r.descricao} — {r.data_gmud}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowTransfer(false)}
                  className="px-4 py-2 rounded border"
                  disabled={transfering}
                >
                  Cancelar
                </button>
                <button
                  onClick={transferir}
                  className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-60"
                  disabled={transfering || !targetReleaseId}
                >
                  {transfering ? 'Transferindo...' : 'Transferir'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

export default TabelaGenerica
