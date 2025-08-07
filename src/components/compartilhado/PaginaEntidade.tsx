// src/components/compartilhado/PaginaEntidade.tsx
import { useRef, useState } from 'react'
import FormularioGenerico, { type CampoFormulario } from './FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from './TabelaGenerica'
import { supabase } from '../../supabase/client'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PaginaEntidadeProps {
  nome_tabela: string
  rotulo_formulario: string
  rotulo_grid: string
  campos: CampoFormulario[]
}

export default function PaginaEntidade({ nome_tabela, rotulo_formulario, rotulo_grid, campos }: PaginaEntidadeProps) {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const [dadosEdicao, setDadosEdicao] = useState<Record<string, string> | null>(null)
  const [formAberto, setFormAberto] = useState(false)
  const [estadoFormAnterior, setEstadoFormAnterior] = useState(false)

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvar = async (dados: Record<string, string>) => {
    if (supabase == null) return;

    if (dados.id) {
      const { error } = await supabase.from(nome_tabela).update(dados).eq('id', dados.id)
      if (error) throw error
      setFormAberto(estadoFormAnterior)
    } else {
      const { error } = await supabase.from(nome_tabela).insert(dados)
      if (error) throw error
    }

    setDadosEdicao(null)
    refTabela.current?.recarregar()
  }

  const editar = (registro: any) => {
    setDadosEdicao(registro)
    setEstadoFormAnterior(formAberto)
    setFormAberto(true)    
  }

  const deletar = async (registro: any) => {
    if (!confirm('Deseja realmente deletar?')) return
    const { error } = await supabase!.from(nome_tabela).delete().eq('id', registro.id)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  const deletarMultiplos = async (ids: string[]) => {
    if (!confirm(`Deseja deletar ${ids.length} registros?`)) return
    const { error } = await supabase!.from(nome_tabela).delete().in('id', ids)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{rotulo_formulario}</h2>
          <button
            onClick={() => {
              setDadosEdicao(null)
              setFormAberto(!formAberto)
            }}
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition "
          >
            {formAberto ? (
              <div className="flex justify-between items-center gap-2 ">Fechar <ChevronUp /> </div>
            ) : (
              <div className="flex justify-between items-center gap-2 ">Novo <ChevronDown /> </div>
            )
            }
          </button>
        </div>

        {formAberto && (
          <FormularioGenerico campos={campos} onSalvar={salvar} dadosEdicao={dadosEdicao} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 {rotulo_grid}</h2>
        <TabelaGenerica
          tabela={nome_tabela}
          colunas={colunas}
          ref={refTabela}
          onEditar={editar}
          onDeletar={deletar}
          onExcluirMultiplos={deletarMultiplos}
        />
      </div>
    </div>
  )
}