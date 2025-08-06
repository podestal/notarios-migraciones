
import { useState } from "react"
import ViajeMain from "./components/api/ViajeMain"
import useGetViajes from "./hooks/useGetViajes"
import ViajeFilters from "./components/api/participante/ViajeFilters"

const App = () => {

  const [kardex, setKardex] = useState('')
  const { data: viaje, isLoading, isError, error, refetch } = useGetViajes({ kardex })

  // if (isSuccess) 

  return (
    <>
    <div className="flex gap-4 items-start justify-center my-8">
      <ViajeFilters kardex={kardex} setKardex={setKardex} refetch={refetch} />
    </div>
    {isLoading && <p className="text-center text-2xl animate-pulse">Cargando...</p>}
    {isError && <p className="text-center text-xs text-red-500">Error: {error.message}</p>}
    {viaje && <ViajeMain viaje={viaje} />}
    </>
  )
}

export default App