import React, { useRef } from 'react'
import ContatoForm from '../components/ContatoForm'
import ContatoGrid, { type ContatoGridHandle } from '../components/ContatoGrid'

export default function Contatos() {
  const gridRef = useRef<ContatoGridHandle>(null)

  return (
    <div className="w-full space-y-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          📋 Cadastro de Contato
        </h2>
        <ContatoForm onSaved={() => gridRef.current?.reload()} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          📑 Lista de Contatos
        </h2>
        <ContatoGrid ref={gridRef} />
      </div>
    </div>
  )
}
