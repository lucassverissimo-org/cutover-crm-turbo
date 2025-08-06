// src/pages/RelacaoEstorias.tsx

import { useRef } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function RelacaoEstorias() {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const tabela = 'relacao_estorias'

  const campos = [
    { nome: 'id_estoria', rotulo: 'ID Estória', tipo: 'texto' as const },
    { nome: 'titulo', rotulo: 'Título', tipo: 'texto' as const },
    { nome: 'status', rotulo: 'Status', tipo: 'texto' as const },
    { nome: 'tipo', rotulo: 'Tipo', tipo: 'texto' as const },
    { nome: 'sprint', rotulo: 'Sprint', tipo: 'texto' as const },
    { nome: 'responsavel', rotulo: 'Responsável', tipo: 'texto' as const },
    { nome: 'observacao', rotulo: 'Observação', tipo: 'area' as const }
  ]

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvarEstoria = async (dados: Record<string, string>) => {
    if (supabase == null) return;
    const { error } = await supabase.from(tabela).insert(dados)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Cadastro de Estórias</h2>
        <FormularioGenerico campos={campos} onSalvar={salvarEstoria} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista de Estórias</h2>
        <TabelaGenerica tabela={tabela} colunas={colunas} ref={refTabela} />
      </div>
    </div>
  )
}
