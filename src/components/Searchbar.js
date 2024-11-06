import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
      }
    }, 300); // Retraso para esperar que el usuario deje de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="flex items-center justify-center w-full relative">
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        type="text"
        placeholder="Buscar productos..."
        className="bg-white border-2 border-sky-400 shadow-xl text-black p-2 pr-10 rounded-lg w-1/2"
        value={searchTerm}
      />
    </div>
  );
}
