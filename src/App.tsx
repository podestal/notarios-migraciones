
import { useEffect, useState } from "react"
import ViajeMain from "./components/api/ViajeMain"
import useGetViajes from "./hooks/useGetViajes"
import ViajeFilters from "./components/api/ViajeFilters"
import ViajePaginator from "./components/api/ViajePaginator"

const App = () => {

  const access = '1234567890'
  const [kardex, setKardex] = useState('')
  const [name, setName] = useState('')
  const [interiorExterior, setInteriorExterior] = useState('')
  const presentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(`${presentYear}`)
  const [page, setPage] = useState(1)


  useEffect(() => {
    setPage(1)
  }, [kardex, interiorExterior, name, selectedYear])
  const { data: viajesPage, isLoading, isError, error, refetch } = useGetViajes({ crono: kardex, tipoPermiso: interiorExterior, nombreParticipante: name, page, access, year:2025 })

  // if (isSuccess) 

  return (
    <>
    <div className="flex gap-4 items-start justify-center my-8">
      <ViajeFilters 
        kardex={kardex} 
        setKardex={setKardex} 
        refetch={refetch} 
        setName={setName} 
        name={name} 
        setInteriorExterior={setInteriorExterior} 
        interiorExterior={interiorExterior}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
      />
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
    <>{console.log(viajesPage)}</>
    {viajesPage && 
    <div className="flex flex-col gap-4 py-8">
    <ViajeMain viajes={viajesPage.results} />
    <ViajePaginator page={page} setPage={setPage} itemsCount={viajesPage.count} itemsPerPage={10} />
    </div>
    }
    </>
  )
}

export default App