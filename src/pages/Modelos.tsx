import { useRef, useState } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function Modelos() {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const [dadosEdicao, setDadosEdicao] = useState<Record<string, string> | null>(null)
  const tabela = 'modelos'

  const campos = [
    { nome: 'estoria', rotulo: 'Estória', tipo: 'texto' as const, obrigatorio: true },
    { nome: 'nome_modelo', rotulo: 'Nome do Modelo', tipo: 'texto' as const },
    { nome: 'entidade', rotulo: 'Entidade', tipo: 'texto' as const },
    { nome: 'tipo', rotulo: 'Tipo', tipo: 'texto' as const },
    { nome: 'observacoes', rotulo: 'Observações', tipo: 'area' as const },    
  ]

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvarModelos = async (dados: Record<string, string>) => {
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

  const editarModelos = (registro: any) => {
    setDadosEdicao(registro)
  }

  const deletarModelos = async (registro: any) => {
    if (!confirm('Deseja realmente deletar?')) return
    const { error } = await supabase!.from(tabela).delete().eq('id', registro.id)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Cadastro Modelos (Email / Documentos / Relatórios)</h2>
        <FormularioGenerico campos={campos} onSalvar={salvarModelos} dadosEdicao={dadosEdicao} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista</h2>
        <TabelaGenerica
          tabela={tabela}
          colunas={colunas}
          ref={refTabela}
          onEditar={editarModelos}
          onDeletar={deletarModelos}
        />
      </div>
    </div>
  )
}
