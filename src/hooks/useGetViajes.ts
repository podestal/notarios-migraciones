import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import type { Viaje } from "../components/api/ViajeMain"

interface Props {
    kardex: string
}

const useGetViajes = ({ kardex }: Props): UseQueryResult<Viaje, Error> => {

    return useQuery({
        queryKey: ['viaje', kardex],
        queryFn: async () => {
            const response = await axios.get<Viaje>(`${import.meta.env.VITE_API_URL}permi_viaje/by_kardex/?kardex=${kardex}`);
            return response.data;
        
        },
        enabled: false,
        retry: false,
    });
}


export default useGetViajes
