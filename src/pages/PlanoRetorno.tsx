import { useRef, useState } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function PlanoRetorno() {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const [dadosEdicao, setDadosEdicao] = useState<Record<string, string> | null>(null)
  const tabela = 'plano_retorno'

  const campos = [
    { nome: 'step', rotulo: 'Step', tipo: 'texto' as const },
    { nome: 'atividade', rotulo: 'Atividade', tipo: 'texto' as const },
    { nome: 'status', rotulo: 'Status', tipo: 'texto' as const },
    { nome: 'dependencia', rotulo: 'Dependência', tipo: 'texto' as const },
    { nome: 'solicitante', rotulo: 'Solicitante', tipo: 'texto' as const },
    { nome: 'executor', rotulo: 'Executor', tipo: 'texto' as const },
    { nome: 'inicio', rotulo: 'Início', tipo: 'data' as const },
    { nome: 'termino', rotulo: 'Término', tipo: 'data' as const },
    { nome: 'observacao', rotulo: 'Observação', tipo: 'area' as const }
  ]

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvarPlano = async (dados: Record<string, string>) => {
    if (supabase == null) return;

    if (dados.id) {
      const { error } = await supabase.from(tabela).update(dados).eq('id', dados.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from(tabela).insert(dados)
      if (error) throw error
    }

    setDadosEdicao(null)
    refTabela.current?.recarregar()
  }

  const editarPlano = (registro: any) => {
    setDadosEdicao(registro)
  }

  const deletarPlano = async (registro: any) => {
    if (!confirm('Deseja realmente deletar?')) return
    const { error } = await supabase!.from(tabela).delete().eq('id', registro.id)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Cadastro</h2>
        <FormularioGenerico campos={campos} onSalvar={salvarPlano} dadosEdicao={dadosEdicao} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista</h2>
        <TabelaGenerica
          tabela={tabela}
          colunas={colunas}
          ref={refTabela}
          onEditar={editarPlano}
          onDeletar={deletarPlano}
        />
      </div>
    </div>
  )
}
