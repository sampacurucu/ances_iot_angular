import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CropSummaryModel } from "../models/crop.summary.model";
import { ProcessModel } from "../../procesos/models/process.model";
import { FarmerModel } from "../models/farmer.model";
import { SmartPointSimpleModel } from "../models/smart.point.simple.model";
import { ProcesoIniciadoModel } from "../models/proceso.iniciado.model";
import { ProcesoIniSummaryModel } from "../models/proceso.ini.summary.model";

@Injectable({
  providedIn: 'root'
})
export class ProcesoIniciadoService {
  private readonly baseUrl = 'http://localhost:8085/api';
  constructor(private http: HttpClient) {}


  // Método para obtener un área por su ID finca
    obtenerAreasByFarm(idFarm: string) {
      return this.http.get<CropSummaryModel[]>(`${this.baseUrl}/crops/byFarm/${idFarm}`);
    }

    // obtener todos los procesos
    getAllProcesses() {
      return this.http.get<ProcessModel[]>(`${this.baseUrl}/all/process`);
    }

    // obtener todos los agricultores
    getAllFarmers() {
      return this.http.get<FarmerModel[]>(`${this.baseUrl}/all/farmers`);
    }

    // Método para obtener puntos por su ID finca
    obtenerPuntosByArea(idArea: string) {
      return this.http.get<SmartPointSimpleModel[]>(`${this.baseUrl}/points/byArea/${idArea}`);
    }
    //metodo para guardar el proceso iniciado
    iniciarProceso(payload: ProcesoIniciadoModel) {
      return this.http.post(`${this.baseUrl}/new/process/started`, payload);
    }

    // Método para obtener todos los procesos iniciados
    getProcesosIniciados() {
      return this.http.get<ProcesoIniSummaryModel[]>(`${this.baseUrl}/all/process/started`);
    }


}