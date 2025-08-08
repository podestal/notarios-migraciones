import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import type { Viaje } from "../components/api/ViajeMain"

interface Props {
    kardex: string
    nombre?: string
}

const useGetViajes = ({ kardex, nombre }: Props): UseQueryResult<Viaje, Error> => {

    let params: {kardex: string, nombreParticipante?: string} = {kardex}
    if (nombre) {
        params.nombreParticipante = nombre
    }

    return useQuery({
        queryKey: ['viaje', kardex],
        queryFn: async () => {
            const response = await axios.get<Viaje>(`${import.meta.env.VITE_API_URL}permi_viaje/by_kardex/`, {params});
            return response.data;
        
        },
        enabled: false,
        retry: false,
    });
}


export default useGetViajes
