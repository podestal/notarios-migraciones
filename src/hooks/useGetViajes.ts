import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import type { Viaje } from "../components/api/ViajeMain"

interface Props {
    kardex: string
}

const useGetViajes = ({ kardex }: Props): UseQueryResult<Viaje, Error> => {
    return useQuery({
        queryKey: ['viaje'],
        queryFn: async () => {
            const response = await axios.get<Viaje>(`http://127.0.0.1:8001/viajes/viajes/by_kardex/?kardex=${kardex}`);
            return response.data;
        },
        enabled: false,
    });
}


export default useGetViajes
