import { useQueryClient, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query"
import type { Viaje } from "../ViajeMain"
import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  kardex: string
  setKardex: (kardex: string) => void
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Viaje, Error>>
}

const ViajeFilters = ({ kardex, setKardex, refetch }: Props) => {

  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const presentYear = new Date().getFullYear()
  const lastYear = presentYear - 1

  useEffect(() => {
    setKardex(`${presentYear}`)
  }, [])

  const handleGetViaje = () => {

    if (kardex.length !== 10) {
      setError("El valor debe tener 10 caracteres.")
      return
    }

    queryClient.invalidateQueries({ queryKey: ['viaje'] })

    refetch()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

      // Allow only numbers
    if (!/^\d*$/.test(input)) {
        setError("Solo se permiten números.")
        return
    }

    // Allow only if it starts with 2024 or 2025
    if (!input.startsWith(`${lastYear}`) && !input.startsWith(`${presentYear}`)) {
      setError(`El valor debe comenzar con ${lastYear} o ${presentYear}.`)
      return
    }

    // Limit total length to 10
    if (input.length > 10) {
      setError("No puede tener más de 10 caracteres.")
      return
    }

    setError(null)
    setKardex(input)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 max-w-xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filtrar por Kardex</h2>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => setKardex(`${lastYear}`)}
          className={`px-4 py-2 border rounded-md transition cursor-pointer ${
            kardex.startsWith(`${lastYear}`) ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"
          }`}
        >
          {lastYear}
        </button>
        <button
          onClick={() => setKardex(`${presentYear}`)}
          className={`px-4 py-2 border rounded-md transition cursor-pointer ${
            kardex.startsWith(`${presentYear}`) ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"
          }`}
        >
          {presentYear}
        </button>

        <input
          value={kardex}
          onChange={handleChange}
          placeholder="Ej: 2025ABC123"
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="flex items-center text-sm text-red-600 mt-1 gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        onClick={handleGetViaje}
        disabled={!!error || !kardex || kardex.length !== 10}
        className={`w-full mt-2 py-2 rounded-md text-white transition-all ${
          !!error || kardex.length !== 10
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer "
        }`}
      >
        Buscar
      </button>
    </div>
  )
}

export default ViajeFilters
