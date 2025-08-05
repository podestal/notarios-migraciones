export const PERMISO_VIAJE_CONDICIONES = [
    { id: 1, id_condicion: '001', des_condicion: 'PADRE', swt_condicion: 'V' },
    { id: 2, id_condicion: '002', des_condicion: 'MENOR', swt_condicion: 'V' },
    { id: 3, id_condicion: '003', des_condicion: 'APODERADO', swt_condicion: 'V' },
    { id: 4, id_condicion: '004', des_condicion: 'TUTOR', swt_condicion: 'V' },
    { id: 10, id_condicion: '005', des_condicion: 'MADRE', swt_condicion: 'V' },
    { id: 11, id_condicion: '010', des_condicion: 'TESTIGO', swt_condicion: 'V' },
  ];

export interface Participante {
    id_viaje: number
    documento: string
    nombres: string
    condicion: string
    edad: string
    incapacidad: string
}

export interface Viaje {
    id_viaje: number
    num_kardex: string
    asunto: string
    fecha_ingreso: string
    referencia: string
    num_formu: string
    lugar_formu: string
    observacion: string
    sede_regis: string
    via: string
    fecha_desde: string
    fecha_hasta: string
    participantes: Participante[]
}

interface Props {
    viaje: Viaje
}

const ViajeMain = ({ viaje }: Props) => {

  return (
    <>
    <div className="grid grid-cols-7 gap-4 justify-center items-center text-center bg-slate-200 text-black text-xs font-semibold p-2 my-4 mx-6">
      <div>Nro Control</div>
      <div>Cronológico</div>
      <div className="col-span-2">Participantes</div>
      <div>Fec. Ingreso</div>
      <div className="col-span-2">Descripción</div>
    </div>
    {viaje && (
       <>
        <div
            className="grid grid-cols-7 gap-4 p-2 my-4 mx-6 text-xs"
          >
            <p 
                // onClick={() => setOpen(true)}
                className="text-center text-blue-600 cursor-pointer hover:text-blue-500">{viaje.num_formu}</p>
            <p className="text-center">{viaje.num_kardex}</p>
            <div className="col-span-2 text-center">
                {viaje.participantes.map((participante) => (
                    <div 
                        className="grid grid-cols-6 gap-10 items-start justify-start text-left"
                        key={participante.id_viaje}>
                        <p className="font-semibold">{PERMISO_VIAJE_CONDICIONES.find(condicion => condicion.id_condicion === participante.condicion)?.des_condicion}:</p>
                        <p className="col-span-5">{participante.nombres}</p>
                    </div>
                ))}
            </div>
            <p className="text-center">{viaje.fecha_ingreso}</p>
            <p className="col-span-2 text-center">{viaje.lugar_formu}</p>
          </div>
          <div className="grid grid-cols-9 gap-4 p-2 my-4 mx-6 text-xs">
            <div>Fecha desde: {viaje.fecha_desde}</div>
            <div>Fecha hasta: {viaje.fecha_hasta}</div>
            <div className="col-span-6 text-center flex flex-col gap-2">
                <p className="font-semibold">Observación:</p>
                <p className="text-left">{viaje.observacion}</p>
            </div>
          </div>
        </>
    )}
    </>
  )
}

export default ViajeMain