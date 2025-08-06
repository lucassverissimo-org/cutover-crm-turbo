import { useRef } from 'react'
import PlanoRetornoForm from '../components/PlanoRetorno/PlanoRetornoForm'
import PlanoRetornoGrid, { type PlanoRetornoGridHandle } from '../components/PlanoRetorno/PlanoRetornoGrid'

export default function PlanoRetorno() {
  const gridRef = useRef<PlanoRetornoGridHandle>(null)

  return (
    <div className="w-full space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          📝 Cadastro de Plano de Retorno
        </h2>
        <PlanoRetornoForm onSaved={() => gridRef.current?.reload()} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          📃 Atividades do Plano
        </h2>
        <PlanoRetornoGrid ref={gridRef} />
      </div>
    </div>
  )
}
