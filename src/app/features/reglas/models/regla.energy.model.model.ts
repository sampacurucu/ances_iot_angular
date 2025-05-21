import { CondicionModel } from "./condicion.model";

export interface ReglaEnergyModel {

    procesoIniciadoId: string;
    
    tipo: string;
    nombre: string;
    // actividadId: string;
    frecuencia: number;
    operadorCondiciones: string;

    dispositivoId: string;

    propiedad: string;

    descripcion: string;
    condiciones: CondicionModel[];
}