import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (initialTheme === 'dark') {
      root.classList.add('dark')
      setTheme('dark')
    } else {
      root.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    if (theme === 'light') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return { theme, toggleTheme }
}
