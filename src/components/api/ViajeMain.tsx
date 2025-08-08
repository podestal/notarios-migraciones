import { motion, AnimatePresence } from "framer-motion";
import { Users, CalendarDays, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";

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
    viaje: Viaje
}

const ViajeMain = ({ viaje }: Props) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 my-6 mx-4 space-y-4"
    >
      {/* Header (always visible) */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold mx-auto text-blue-700">
            Cronológico: {viaje.num_kardex}
          </h2>
          <p className="text-sm text-gray-600">
            Nro Control: {viaje.num_formu}
          </p>
        </div>

        <div className="text-sm text-gray-700 mx-auto">
          <CalendarDays className="inline mr-1 w-4 h-4" />
          Ingreso:{" "}
          <span className="font-semibold text-gray-800">
            {viaje.fec_ingreso}
          </span>
        </div>

        <div className="text-sm text-gray-700">
          <FileText className="inline mr-1 w-4 h-4" />
          Lugar:{" "}
          <span className="font-semibold text-gray-800">
            {viaje.lugar_formu}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="ml-auto flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          aria-expanded={isOpen}
          aria-controls={`viaje-body-${viaje.id_viaje}`}
        >
          {isOpen ? 'Ocultar' : 'Mostrar'}
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        </button>
      </div>

      {/* Body (collapsible) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="viaje-body"
            id={`viaje-body-${viaje.id_viaje}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden space-y-6"
          >
            {/* Participantes */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Participantes:
              </h3>
              <div className="space-y-1 text-sm">
                {viaje.contratantes.map((contratante) => (
                  <motion.div
                    key={contratante.id_contratante}
                    className="border border-gray-100 rounded p-2 bg-gray-50"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-semibold text-gray-600">
                      {
                        PERMISO_VIAJE_CONDICIONES.find(
                          (c) => c.id_condicion === contratante.c_condicontrat
                        )?.des_condicion
                      }
                    </p>
                    <p className="text-gray-800">{contratante.c_descontrat}</p>
                  </motion.div>
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
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ViajeMain