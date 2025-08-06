import { useRef } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function PlanoRetorno() {
  const refTabela = useRef<TabelaGenericaRef>(null)
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
    if (supabase == null){
      return;
    }

    const { error } = await supabase.from(tabela).insert(dados)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Cadastro</h2>
        <FormularioGenerico campos={campos} onSalvar={salvarPlano} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista</h2>
        <TabelaGenerica tabela={tabela} colunas={colunas} ref={refTabela} />
      </div>
    </div>
  )
}
