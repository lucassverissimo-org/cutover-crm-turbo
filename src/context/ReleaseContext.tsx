import { createContext, useContext, useState, type ReactNode } from 'react'

interface Release {
  id: string
  versao: string
  patch: string
  data_gmud: string
}

interface ReleaseContextType {
  releaseSelecionada: Release | null
  setReleaseSelecionada: (release: Release) => void
}

const ReleaseContext = createContext<ReleaseContextType | undefined>(undefined)

export const ReleaseProvider = ({ children }: { children: ReactNode }) => {
  const [releaseSelecionada, setReleaseSelecionada] = useState<Release | null>(null)

  return (
    <ReleaseContext.Provider value={{ releaseSelecionada, setReleaseSelecionada }}>
      {children}
    </ReleaseContext.Provider>
  )
}

export const useRelease = () => {
  const context = useContext(ReleaseContext)
  if (!context) throw new Error('useRelease precisa estar dentro do ReleaseProvider')
  return context
}
