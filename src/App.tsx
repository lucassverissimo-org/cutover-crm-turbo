import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Download, Moon, Sun } from 'lucide-react'
import { AppRoutes, AppTabs } from './routes'
import useTheme from './hooks/useTheme'
import { exportAllDataToXLSX } from './utils/exportXLS'

function Tabs() {
  const location = useLocation()
  return (
    <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-300 dark:border-gray-700">
      {AppTabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`py-2 px-4 rounded-md text-sm font-medium transition ${
            location.pathname === tab.path
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-background dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">CRM - Plano de Cutover</h1>
            <div className="flex gap-2">
              <button
                onClick={exportAllDataToXLSX}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-green-700 transition"
              >
                <Download size={20} /> Exportar
              </button>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-sm font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>

          <Tabs />
          <AppRoutes />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </BrowserRouter>
  )
}