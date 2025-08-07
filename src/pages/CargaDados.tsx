// src/pages/CargaDados.tsx
import { useRef, useState } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function CargaDados() {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const [dadosEdicao, setDadosEdicao] = useState<Record<string, string> | null>(null)
  const tabela = 'carga_dados'

  const campos = [
    // { nome: 'id', rotulo: 'ID', tipo: 'texto' as const },
    { nome: 'estoria_relacionada', rotulo: 'Estória Relacionada', tipo: 'texto' as const },
    { nome: 'entidade', rotulo: 'Entidade', tipo: 'texto' as const },
    { nome: 'total_registros', rotulo: 'Total de Registros', tipo: 'texto' as const },
    { nome: 'filtro', rotulo: 'Filtro', tipo: 'area' as const },
    { nome: 'observacoes', rotulo: 'Observações', tipo: 'area' as const }
  ]

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvar = async (dados: Record<string, string>) => {
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

  const editar = (registro: any) => {
    setDadosEdicao(registro)
  }

  const deletar = async (registro: any) => {
    if (!confirm('Deseja realmente deletar?')) return
    const { error } = await supabase!.from(tabela).delete().eq('id', registro.id)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Carga de Dados</h2>
        <FormularioGenerico 
            campos={campos} 
            onSalvar={salvar} 
            dadosEdicao={dadosEdicao} 
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista de Cargas</h2>
        <TabelaGenerica
          tabela={tabela}
          colunas={colunas}
          ref={refTabela}
          onEditar={editar}
          onDeletar={deletar}
        />
      </div>
    </div>
  )
}
