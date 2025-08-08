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

  const getBaseKardex = (year: string) => `${year}000000`

  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const presentYear = new Date().getFullYear()
  const lastYear = presentYear - 1
  const [selectedYear, setSelectedYear] = useState(`${presentYear}`)
  const [typedDigits, setTypedDigits] = useState<string>("")

  // Initialize once on mount based on current year or existing kardex
  useEffect(() => {
    const initial = kardex && /^\d{10}$/.test(kardex) ? kardex : getBaseKardex(selectedYear)
    const suffix = initial.slice(4)
    const initialTyped = suffix.replace(/^0+/, "").slice(0, 6)
    setTypedDigits(initialTyped)
    setKardex(initial)
    setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildKardexFromTyped = (year: string, digits: string) => year + digits.slice(-6).padStart(6, "0")

  const commitTypedDigits = (digits: string) => {
    const normalized = digits.slice(0, 6)
    setTypedDigits(normalized)
    const finalValue = buildKardexFromTyped(selectedYear, normalized)
    setKardex(finalValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key

    // Allow navigation keys
    if (["Tab", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) {
      return
    }

    // Handle deletion
    if (key === "Backspace" || key === "Delete") {
      e.preventDefault()
      if (typedDigits.length > 0) {
        commitTypedDigits(typedDigits.slice(0, -1))
      } else {
        commitTypedDigits("")
      }
      setError(null)
      return
    }

    // Numerics
    if (/^\d$/.test(key)) {
      e.preventDefault()
      if (typedDigits.length < 6) {
        commitTypedDigits(typedDigits + key)
      } else {
        // Shift left if already at 6 and user keeps typing
        commitTypedDigits((typedDigits + key).slice(-6))
      }
      setError(null)
      return
    }

    // Block any other input
    e.preventDefault()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text") || ""
    const digits = (text.match(/\d/g) || []).join("")
    commitTypedDigits(digits.slice(-6))
    setError(null)
  }

  const handleGetViaje = () => {
    const current = buildKardexFromTyped(selectedYear, typedDigits)
    if (current.length !== 10) {
      setError("El valor debe tener 10 caracteres.")
      return
    }
    queryClient.invalidateQueries({ queryKey: ['viaje'] })
    refetch()
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value
    setSelectedYear(year)
    commitTypedDigits("")
    setError(null)
  }

  const displayValue = buildKardexFromTyped(selectedYear, typedDigits)

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 max-w-xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filtrar por Kardex</h2>

      <div className="flex gap-4 items-center">
        {/* Year Selector */}
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
          <option value={lastYear}>{lastYear}</option>
          <option value={presentYear}>{presentYear}</option>
        </select>

        {/* Kardex Input */}
        <input
          value={displayValue}
          onChange={() => { /* no-op: we handle input via keydown/paste */ }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={getBaseKardex(selectedYear)}
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center text-sm text-red-600 mt-1 gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleGetViaje}
        disabled={!!error || !displayValue || displayValue.length !== 10}
        className={`w-full mt-2 py-2 rounded-md text-white transition-all ${
          !!error || displayValue.length !== 10
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        Buscar
      </button>
    </div>
  )
}

export default ViajeFilters
