import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Cog, Download, Moon, Sun } from 'lucide-react'
import { AppRoutes, AppTabs } from './routes'
import useTheme from './hooks/useTheme'
import { exportAllDataToXLSX } from './utils/exportXLS'
import { useEffect, useState } from 'react'
import SettingsModal from './components/compartilhado/SettingsModal'
import { getReleases } from './services/releaseService'
import { useRelease } from './context/ReleaseContext'

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
  const [showSettings, setShowSettings] = useState(false)
  const [releases, setReleases] = useState<any[]>([])
  const { releaseSelecionada, setReleaseSelecionada } = useRelease()
    
  useEffect(() => {
    const carregarReleases = async () => {
      const { data, error } = await getReleases()
      if (!error && data.length > 0) {
        setReleases(data)

        const stored = localStorage.getItem('releaseSelecionada')
        if (stored) {
          const releaseSalva = JSON.parse(stored)
          const existe = data.find(r => r.id === releaseSalva.id)
          if (existe) {
            setReleaseSelecionada(existe)
            return
          }
        }

        setReleaseSelecionada(data[0])
      }
    }
    carregarReleases()
  }, [])
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-background dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">CRM - Plano de Cutover</h1>
            <div className="flex gap-10">
                           
                <div className="flex items-center">                  
                  <select
                    value={releaseSelecionada?.id || ''}
                    onChange={(e) => {
                      const release = releases.find(r => r.id === e.target.value)
                      if (release) {
                        setReleaseSelecionada(release)
                        localStorage.setItem('releaseSelecionada', JSON.stringify(release))                        
                      }
                    }}
                    className="px-2 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    {releases.map((r: any) => (
                      <option key={r.id} value={r.id}>
                        Release {r.versao}.{r.patch} – {new Date(r.data_gmud).toLocaleDateString()}
                      </option>
                    ))}
                  </select>                 
                </div>
                <button
                  onClick={exportAllDataToXLSX}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-green-700 transition"
                >
                  <Download size={20} /> Exportar
                </button>
              
              <div className='flex gap-2'>

                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  title="Abrir configurações"
                >
                  <Cog size={20} />
                </button>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-sm font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>
            </div>
          </div>

          <Tabs />
          <AppRoutes />
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </BrowserRouter>
  )
}