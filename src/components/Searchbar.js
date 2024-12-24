import { useState, useEffect } from 'react'

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm)
      }
    }, 300) // Retraso para esperar que el usuario deje de escribir

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, onSearch])

  return (
    <div className="flex items-center justify-center w-full relative">
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        type="text"
        placeholder="Buscar productos..."
        className="w-1/2 p-2 rounded-lg border border-accent-gold focus:outline-none focus:ring-2 focus:ring-gold text-black"
        value={searchTerm}
      />
    </div>
  )
}
