import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import getPermisoViajeService, { type PermisoViajePage } from "../services/permisoViajeService"

interface Props {
    crono?: string
    nombreParticipante?: string
    tipoPermiso?: string
    page: number
    access: string
    year: number
}

const useGetViajes = ({ crono, tipoPermiso, nombreParticipante, page, access, year }: Props): UseQueryResult<PermisoViajePage, Error> => {

    const permisoViajeService = getPermisoViajeService()
    let params: Record<string, string> = {
        page: page.toString(),
    };

    console.log(crono)
    console.log(`${year}000000`)

    if (crono !== `${year}000000` && crono !== undefined) params = { ...params, crono };
    if (tipoPermiso !== '0' && tipoPermiso !== undefined) params = { ...params, tipoPermiso };
    if (nombreParticipante) params = { ...params, nombreParticipante };

    return useQuery({
        queryKey: ['viaje', page],
        queryFn: () => permisoViajeService.get(params),
    });
}


export default useGetViajes
