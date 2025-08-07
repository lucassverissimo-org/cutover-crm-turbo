import { Route, Routes, Navigate } from 'react-router-dom'
import Contatos from './pages/Contatos'
import PlanoRetorno from './pages/PlanoRetorno'
import RelacaoEstorias from './pages/RelacaoEstorias'
import CargaDados from './pages/CargaDados'
import Modelos from './pages/Modelos'
import Plugins from './pages/Plugins'
import RecursosWeb from './pages/RecursosWeb'
import ConectoresPersonalizados from './pages/ConectoresPersonalizados'

const routes = [
  { path: '/contatos', label: 'Contatos', element: <Contatos /> },
  { path: '/plano-retorno', label: 'Plano de Retorno', element: <PlanoRetorno /> },
  { path: '/relacao-estorias', label: 'Relação de Estórias', element: <RelacaoEstorias /> },
  { path: '/carga-dados', label: 'Carga de Dados', element: <CargaDados /> },
  { path: '/modelos', label: 'Modelos', element: <Modelos /> },
  { path: '/plugins', label: 'Plugins', element: <Plugins /> },
  { path: '/recursos-web', label: 'Recursos Web', element: <RecursosWeb /> },
  { path: '/conectores-personalizados', label: 'Conectores Personalizados', element: <ConectoresPersonalizados /> },
]

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/contatos" />} />
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
)

export const AppTabs = routes.map(({ path, label }) => ({ path, label }))
