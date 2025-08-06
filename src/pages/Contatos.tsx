import { useRef, useState } from 'react'
import FormularioGenerico from '../components/compartilhado/FormularioGenerico'
import TabelaGenerica, { type TabelaGenericaRef } from '../components/compartilhado/TabelaGenerica'
import { supabase } from '../supabase/client'

export default function Contatos() {
  const refTabela = useRef<TabelaGenericaRef>(null)
  const [dadosEdicao, setDadosEdicao] = useState<Record<string, string> | null>(null)
  const tabela = 'contatos'

  const campos = [
    { nome: 'nome', rotulo: 'Nome', tipo: 'texto' as const, obrigatorio: true },
    { nome: 'empresa', rotulo: 'Empresa', tipo: 'texto' as const },
    { nome: 'papel_projeto', rotulo: 'Papel no projeto', tipo: 'texto' as const },
    { nome: 'email', rotulo: 'Email', tipo: 'texto' as const },
    { nome: 'telefone', rotulo: 'Telefone', tipo: 'texto' as const },
    { nome: 'login', rotulo: 'Login', tipo: 'texto' as const },
    { nome: 'rg', rotulo: 'RG', tipo: 'texto' as const },
  ]

  const colunas = campos.map(c => ({
    chave: c.nome,
    titulo: c.rotulo,
    tipo: c.tipo
  }))

  const salvarContato = async (dados: Record<string, string>) => {
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

  const editarContato = (registro: any) => {
    setDadosEdicao(registro)
  }

  const deletarContato = async (registro: any) => {
    if (!confirm('Deseja realmente deletar?')) return
    const { error } = await supabase!.from(tabela).delete().eq('id', registro.id)
    if (error) throw error
    refTabela.current?.recarregar()
  }

  return (
    <div className="space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Cadastro</h2>
        <FormularioGenerico campos={campos} onSalvar={salvarContato} dadosEdicao={dadosEdicao} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">📃 Lista</h2>
        <TabelaGenerica
          tabela={tabela}
          colunas={colunas}
          ref={refTabela}
          onEditar={editarContato}
          onDeletar={deletarContato}
        />
      </div>
    </div>
  )
}
