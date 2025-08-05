import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import type { Viaje } from "../ViajeMain"

interface Props {
    kardex: string
    setKardex: (kardex: string) => void
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Viaje, Error>>
}

const ViajeFilters = ({ kardex, setKardex, refetch }: Props) => {


    const handleGetViaje = () => {
        refetch()
    }
    
  return (
<>
    <input 
        value={kardex}
        onChange={e => setKardex(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-2"

      />
      <button
        onClick={handleGetViaje}
        className="bg-blue-600 text-white rounded-md p-2 cursor-pointer hover:bg-blue-700 transition-all duration-300"
      >
        Buscar
      </button>
</>
  )
}

export default ViajeFilters