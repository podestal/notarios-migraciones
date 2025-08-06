import { motion } from "framer-motion";
import { Users, CalendarDays, FileText } from "lucide-react";

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
    fecha_ingreso: string
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
    viaje: Viaje
}

const ViajeMain = ({ viaje }: Props) => {

  return (
    // <>

    // {viaje && (
    //    <>
    //     <div
    //         className="grid grid-cols-7 gap-4 p-2 my-4 mx-6 text-xs"
    //       >
    //         <p 
    //             // onClick={() => setOpen(true)}
    //             className="text-center text-blue-600 cursor-pointer hover:text-blue-500">{viaje.num_formu}</p>
    //         <p className="text-center">{viaje.num_kardex}</p>
    //         <div className="col-span-2 text-center">
    //             {viaje.contratantes.map((contratante) => (
    //                 <div 
    //                     className="grid grid-cols-6 gap-10 items-start justify-start text-left"
    //                     key={contratante.id_contratante}>
    //                     <p className="font-semibold">{PERMISO_VIAJE_CONDICIONES.find(condicion => condicion.id_condicion === contratante.c_condicontrat)?.des_condicion}:</p>
    //                     <p className="col-span-5">{contratante.c_descontrat}</p>
    //                 </div>
    //             ))}
    //         </div>
    //         <p className="text-center">{viaje.fecha_ingreso}</p>
    //         <p className="col-span-2 text-center">{viaje.lugar_formu}</p>
    //       </div>
    //       <div className="grid grid-cols-9 gap-4 p-2 my-4 mx-6 text-xs">
    //         <div>Fecha desde: {viaje.fecha_desde}</div>
    //         <div>Fecha hasta: {viaje.fecha_hasta}</div>
    //         <div className="col-span-6 text-center flex flex-col gap-2">
    //             <p className="font-semibold">Observación:</p>
    //             <p className="text-left">{viaje.observacion}</p>
    //         </div>
    //       </div>
    //     </>
    // )}
    // </>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 my-6 mx-4 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-blue-700">
            Nro Control: {viaje.num_formu}
          </h2>
          <p className="text-sm text-gray-600">
            Cronológico: {viaje.num_kardex}
          </p>
        </div>

        <div className="text-sm text-gray-700 text-center">
          <CalendarDays className="inline mr-1 w-4 h-4" />
          Ingreso:{" "}
          <span className="font-semibold text-gray-800">
            {viaje.fecha_ingreso}
          </span>
        </div>

        <div className="text-sm text-gray-700 text-center">
          <FileText className="inline mr-1 w-4 h-4" />
          Lugar:{" "}
          <span className="font-semibold text-gray-800">
            {viaje.lugar_formu}
          </span>
        </div>
      </div>

      {/* Participantes */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Participantes:
        </h3>
        <div className="space-y-1 text-sm">
          {viaje.contratantes.map((contratante) => (
            <div
              key={contratante.id_contratante}
              className="border border-gray-100 rounded p-2 bg-gray-50"
            >
              <p className="font-semibold text-gray-600">
                {
                  PERMISO_VIAJE_CONDICIONES.find(
                    (c) => c.id_condicion === contratante.c_condicontrat
                  )?.des_condicion
                }
              </p>
              <p className="text-gray-800">{contratante.c_descontrat}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fechas */}
      <div className="flex flex-col md:flex-row gap-4 justify-between text-sm text-gray-800">
        <div className="flex-1">
          <p className="font-semibold">Fecha desde:</p>
          <p>{viaje.fecha_desde}</p>
        </div>
        <div className="flex-1">
          <p className="font-semibold">Fecha hasta:</p>
          <p>{viaje.fecha_hasta}</p>
        </div>
      </div>

      {/* Observación */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">Observación:</p>
        <p className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-100">
          {viaje.observacion}
        </p>
      </div>
    </motion.div>
  )
}

export default ViajeMain