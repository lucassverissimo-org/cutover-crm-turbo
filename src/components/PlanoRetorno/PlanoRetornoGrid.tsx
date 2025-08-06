import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { supabase } from '../../supabase/client'

export type PlanoRetornoGridHandle = {
  reload: () => void
}

const PlanoRetornoGrid = forwardRef<PlanoRetornoGridHandle>((_, ref) => {
  const [atividades, setAtividades] = useState<any[]>([])  
  const fetchAtividades = async () => {
    if (supabase == null){
        return;
    }

    const { data } = await supabase.from('plano_retorno').select('*').order('inicio', { ascending: true })
    setAtividades(data || [])
  }

  useImperativeHandle(ref, () => ({
    reload: fetchAtividades
  }))

  useEffect(() => {
    fetchAtividades()
  }, [])

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={fetchAtividades}
          className="text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded"
        >
          🔄 Atualizar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Step</th>
              <th className="p-3">Atividade</th>
              <th className="p-3">Status</th>
              <th className="p-3">Solicitante</th>
              <th className="p-3">Executor</th>
              <th className="p-3">Início</th>
              <th className="p-3">Término</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {atividades.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 border-b">{a.step}</td>
                <td className="p-3 border-b">{a.atividade}</td>
                <td className="p-3 border-b">{a.status}</td>
                <td className="p-3 border-b">{a.solicitante}</td>
                <td className="p-3 border-b">{a.executor}</td>
                <td className="p-3 border-b">{a.inicio}</td>
                <td className="p-3 border-b">{a.termino}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default PlanoRetornoGrid
