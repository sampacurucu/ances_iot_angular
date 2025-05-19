import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProcesoIniSummaryModel } from "../../procesos_iniciados/models/proceso.ini.summary.model";
import { ActivityModel } from "../../procesos/models/activity.model";
import { DispositivoResumenModel } from "../../areaproduccion/models/dispsitivo.resumen.model";
import { ReglaModel } from "../models/regla.model";

@Injectable({
  providedIn: 'root'
})

export class ReglasService {
  private readonly baseUrl = 'http://localhost:8085/api';
  constructor(private http: HttpClient) {}


  // Método para obtener todos los procesos iniciados
  getProcesosIniciados() {
    return this.http.get<ProcesoIniSummaryModel[]>(`${this.baseUrl}/all/process/started`);
  }

  getActivitiesByProcessStarted(id: number) {
    return this.http.get<ActivityModel[]>(`${this.baseUrl}/activities/process/started/${id}`);
  }

  //obten dispositivos
  obtenerDispositivosByProcessStarted(idProcess: string) {
    return this.http.get<DispositivoResumenModel[]>(`${this.baseUrl}/dispositivos/sensores/proceso/${idProcess}`);
  }

  guardarReglas(reglas: ReglaModel[]) {
    return this.http.post(`${this.baseUrl}/new/reglas`, reglas);
  }


}

