export interface PuntoModel {
    nombre: string;
    referencia: string;
    interior: boolean;
    altura: number;
    descripcion: string;
    dispositivoId: string;
    areaId: number;
    x: number; // coordenada X en porcentaje
    y: number; // coordenada Y en porcentaje
  }