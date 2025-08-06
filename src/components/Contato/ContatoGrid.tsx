import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { supabase } from '../../supabase/client'

export type ContatoGridHandle = {
  reload: () => void
}

const ContatoGrid = forwardRef<ContatoGridHandle>((_, ref) => {
  const [contatos, setContatos] = useState<any[]>([])

  const fetchContatos = async () => {
    if (!supabase) return
    const { data } = await supabase.from('contatos').select('*').order('created_at', { ascending: false })
    setContatos(data || [])
  }

  useImperativeHandle(ref, () => ({
    reload: fetchContatos
  }))

  useEffect(() => {
    fetchContatos()
  }, [])

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={fetchContatos}
          className="text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded"
        >
          🔄 Atualizar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Papel</th>
              <th className="p-3">E-mail</th>
              <th className="p-3">Telefone</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {contatos.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 border-b">{c.nome}</td>
                <td className="p-3 border-b">{c.empresa}</td>
                <td className="p-3 border-b">{c.papel_projeto}</td>
                <td className="p-3 border-b">{c.email}</td>
                <td className="p-3 border-b">{c.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default ContatoGrid
