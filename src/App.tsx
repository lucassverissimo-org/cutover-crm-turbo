import { useState } from 'react'
import Contatos from './pages/Contatos'
import useTheme from './hooks/useTheme'
import { ToastContainer } from 'react-toastify'
import { exportAllDataToXLSX } from './utils/exportXLS'

const TABS = ['Contatos']

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('Contatos')

  return (
    <main className="min-h-screen bg-background dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">CRM - Plano de Cutover</h1>
          <button
            onClick={exportAllDataToXLSX}
            className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            📤 Exportar XLS
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-sm font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </div>
        
        <div className="flex space-x-4 mb-4 border-b border-gray-300 dark:border-gray-700">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 -mb-px border-b-2 text-sm font-medium transition ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
                
        <div>
          {activeTab === 'Contatos' && <Contatos />}          
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}
