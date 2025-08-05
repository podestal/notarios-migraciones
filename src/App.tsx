
import { useState } from "react"
import ViajeMain from "./components/api/ViajeMain"
import useGetViajes from "./hooks/useGetViajes"
import ViajeFilters from "./components/api/participante/ViajeFilters"

const App = () => {

  const [kardex, setKardex] = useState('')
  const { data: viaje, isLoading, isError, error, isSuccess, refetch } = useGetViajes({ kardex })

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error: {error.message}</div>
  // if (isSuccess) 

  return (
    <>
    <div className="flex gap-4 items-start justify-center my-8">
      <ViajeFilters kardex={kardex} setKardex={setKardex} refetch={refetch} />
    </div>
    {viaje && <ViajeMain viaje={viaje} />}
    </>
  )
}

export default App