import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FarmModel } from '../models/farm.model';
import { AreaViewModel } from '../models/area.view.model';
import { AreaSimpleModel } from '../models/area.simple.model';
import { DispositivoResumenModel } from '../models/dispsitivo.resumen.model';
import { PuntoModel } from '../models/punto.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  // private apiUrl = 'http://localhost:8085/api/new/area'; // cambia según tu backend
  private readonly baseUrl = 'http://localhost:8085/api';


  constructor(private http: HttpClient) {}
// Método para guardar el área
  guardarArea(formData: FormData) {
    return this.http.post(`${this.baseUrl}/new/area`, formData);
  }
// Método para obtener la lista de fincas
  getFincas() {
    return this.http.get<FarmModel[]>(`${this.baseUrl}/all/farms`);
  }

// Método para obtener la lista de áreas
  obtenerAreas() {
    return this.http.get<AreaViewModel[]>(`${this.baseUrl}/all/areasandfarms`);
  }

  // Método para obtener un área por su ID finca
  obtenerAreasByFarm(idFarm: string) {
    return this.http.get<AreaSimpleModel[]>(`${this.baseUrl}/areas/byfarm/${idFarm}`);
  }

//obten dispositivos
  obtenerDispositivos() {
    return this.http.get<DispositivoResumenModel[]>(`${this.baseUrl}/dispositivos/resumen`);
  }
//guardar los puntos inteligentes
  guardarPuntos(puntos: PuntoModel[]) {
    return this.http.post(`${this.baseUrl}/new/puntos`, puntos);
  }
  


}