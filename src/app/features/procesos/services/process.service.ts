import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessModel } from '../models/process.model';
import { ActivityModel } from '../models/activity.model';
import { ProcessWithActivities } from '../models/process.activities.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private readonly baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  // obtener todos los procesos
  getAllProcesses() {
    return this.http.get<ProcessModel[]>(`${this.baseUrl}/all/process`);
  }

  // obtener todas las actividades
  getAllActivities() {
    return this.http.get<ActivityModel[]>(`${this.baseUrl}/all/activity`);
  }


  //guardar las actividades de un proceso
  guardarRelacionesProcesoActividades(processId: number, activityIds: number[]) {
    const payload = {
      processId: processId,
      activityIds: activityIds
    };
  
    return this.http.post(`${this.baseUrl}/assign/activities`, payload);
  }


  //get procesos con actividades
  getProcessesWithActivities() {
    return this.http.get<ProcessWithActivities[]>(`${this.baseUrl}/processes/with/activities`);
  }
}
