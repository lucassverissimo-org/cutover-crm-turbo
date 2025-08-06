import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

export default function ContatoGrid() {
  const [contatos, setContatos] = useState<any[]>([])

  const fetchContatos = async () => {
    if (!supabase) return
    const { data } = await supabase.from('contatos').select('*')
    setContatos(data || [])
  }

  useEffect(() => {
    fetchContatos()
  }, [])

  if (!supabase) {
    return <p className="text-red-500">⚠️ Supabase não configurado.</p>
  }

  return (
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
  )
}
