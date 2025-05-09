export interface Sensor {
    nombre: string;
    marca: string;
    referencia: string;
    modelo: string;
    propiedad: string;
    fechaMantenimiento: string;
    precision: number;
    frecuencia: number;
    descripcion: string;
  
    direccionDispositivo: string;
    ipGateway: string;
    protocolo: string;
  
    disponeBateria: boolean;
    nombreBateria?: string;
    capacidadBateria?: number;

    equipoId: string;
    tipo: string;
  }
  