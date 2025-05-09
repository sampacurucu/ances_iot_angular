import { Component, OnInit } from '@angular/core';
import { SensorViewModel } from '../../../models/sensor.view.model';
import { DispositivosService } from '../../../services/dispositivos.service';

@Component({
  selector: 'app-view-sensor',
  templateUrl: './view-sensor.component.html',
  styleUrls: ['./view-sensor.component.scss']
})

export class ViewSensorComponent implements OnInit {
  sensores: SensorViewModel[] = [];

  mostrarModal: boolean = false;


  constructor(private dispositivosService: DispositivosService) {}

  ngOnInit(): void {
    this.dispositivosService.getSensoresRegistrados().subscribe({
      next: (data) => this.sensores = data,
      error: (err) => console.error('Error al cargar sensores', err)
    });
  }
}