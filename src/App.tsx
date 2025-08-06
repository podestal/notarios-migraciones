
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
    {isLoading && <p className="text-center text-xs animate-pulse">Cargando...</p>}
    {isError && <p className="text-center text-xs text-red-500">
      {(() => {
        const status = (error as any)?.response?.status;
        if (status === 404) return "No se encontró el documento";
        if (status === 500) return "Problemas con el servidor, intentelo más tarde";
        return `Error: ${status || error.message}`;
      })()}
    </p>}
    {viaje && <ViajeMain viaje={viaje} />}
    </>
  )
}

export default App