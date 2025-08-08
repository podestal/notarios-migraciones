import type { PermisoViaje } from "../../services/permisoViajeService";
import ViajeCard from "./ViajeCard";

export const PERMISO_VIAJE_CONDICIONES = [
    { id: 1, id_condicion: '001', des_condicion: 'PADRE', swt_condicion: 'V' },
    { id: 2, id_condicion: '002', des_condicion: 'MENOR', swt_condicion: 'V' },
    { id: 3, id_condicion: '003', des_condicion: 'APODERADO', swt_condicion: 'V' },
    { id: 4, id_condicion: '004', des_condicion: 'TUTOR', swt_condicion: 'V' },
    { id: 10, id_condicion: '005', des_condicion: 'MADRE', swt_condicion: 'V' },
    { id: 11, id_condicion: '010', des_condicion: 'TESTIGO', swt_condicion: 'V' },
  ];

export interface Contratante {
    id_contratante: number
    c_descontrat: string
    c_condicontrat: string
}

export interface Viaje {
    id_viaje: number
    num_kardex: string
    asunto: string
    fec_ingreso: string
    referencia: string
    num_formu: string
    lugar_formu: string
    observacion: string
    sede_regis: string
    via: string
    fecha_desde: string
    fecha_hasta: string
    contratantes: Contratante[]
}

interface Props {
    viajes: PermisoViaje[]
}

const ViajeMain = ({ viajes }: Props) => {



  return (
    <div>
        {viajes.map((viaje) => (
            <ViajeCard key={viaje.id_viaje} viaje={viaje} />
        ))}
    </div>
  )
}

export default ViajeMain