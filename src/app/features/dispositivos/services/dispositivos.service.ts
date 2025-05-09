import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../models/sensor.model';
import { Observable } from 'rxjs';
import { SensorViewModel } from '../models/sensor.view.model';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {
//   private apiUrl = 'http://localhost:8085/api/sensor';
  private readonly baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  guardarSensor(sensor: Sensor): Observable<any> {
    return this.http.post(`${this.baseUrl}/new/dispositivo/sensor`, sensor);
  }

  getSensoresRegistrados(): Observable<SensorViewModel[]> {
    return this.http.get<SensorViewModel[]>(`${this.baseUrl}/view/dispositivos/sensors`);
    
  }

  getAllEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/all/equipos`);
  }

}
