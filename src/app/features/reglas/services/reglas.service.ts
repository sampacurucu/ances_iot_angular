import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProcesoIniSummaryModel } from "../../procesos_iniciados/models/proceso.ini.summary.model";
import { ActivityModel } from "../../procesos/models/activity.model";
import { DispositivoResumenModel } from "../../areaproduccion/models/dispsitivo.resumen.model";
import { ReglaModel } from "../models/regla.model";
import { ReglaViewModel } from "../models/regla.view.model";
import { ReglaEnergyModel } from "../models/regla.energy.model.model";
import { ReglaEnergyViewModel } from "../models/regla.energy.view.model";

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
  //save regla
  guardarReglas(reglas: ReglaModel[]) {
    return this.http.post(`${this.baseUrl}/new/reglas`, reglas);
  }
  //get reglas por proceso iniciado
  getReglasPorProceso(idProceso: string) {
    return this.http.get<ReglaViewModel[]>(`${this.baseUrl}/reglas/proceso/${idProceso}`);
  }
  //save regla energetica
  guardarReglasEnergeticas(reglas: ReglaEnergyModel[]) {
    return this.http.post(`${this.baseUrl}/new/reglas/energy`, reglas);
  }

  //get reglas energeticas por proceso iniciado
  getReglasEPorProceso(idProceso: string) {
    return this.http.get<ReglaEnergyViewModel[]>(`${this.baseUrl}/reglas/energy/proceso/${idProceso}`);
  }


}

