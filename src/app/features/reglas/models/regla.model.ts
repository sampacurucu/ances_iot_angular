import { CondicionModel } from "./condicion.model";

export interface ReglaModel {

    procesoIniciadoId: string;
    
    tipo: string;
    nombre: string;
    actividadId: string;
    operadorCondiciones: string;

    dispositivoId: string;

    propiedad: string;

    descripcion: string;
    condiciones: CondicionModel[];
}