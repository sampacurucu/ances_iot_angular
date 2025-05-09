import { Component, OnInit } from '@angular/core';
import { DispositivosService } from '../../../services/dispositivos.service';
import { Sensor } from '../../../models/sensor.model';
import { Router } from '@angular/router';
import { Equipo } from '../../../models/equipo.model';

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.scss']
})

export class NewSensorComponent  implements OnInit {
  // Variables del formulario

  // Variables para almacenar los datos de los equipos
  tipo = 'Sensor';
  nombre = '';
  marca = '';
  referencia = '';
  modelo = '';
  propiedad = '';
  fechaMantenimiento = '';
  precision: number = 0;
  frecuencia: number = 0;
  descripcion = '';

  direccionDispositivo = '';
  ipGateway = '';
  protocolo = '';

  disponeBateria = false;
  nombreBateria = '';
  capacidadBateria: number = 0;

  mensajeError: string = '';

  equipos: Equipo[] = [];
  equipoId:string = '';

  constructor(private dispositivoService: DispositivosService, private router: Router) {}

  ngOnInit(): void {
    this.dispositivoService.getAllEquipos().subscribe({
      next: (data) => this.equipos = data,
      error: (err) => console.error('Error cargando equipos', err)
    });
  }

  guardarSensor() {

    if (
      !this.nombre.trim() ||
      !this.marca.trim() ||
      !this.referencia.trim() ||
      !this.modelo.trim() ||
      !this.propiedad.trim() ||
      !this.fechaMantenimiento ||
      this.precision <= 0 ||
      this.frecuencia <= 0 ||
      !this.descripcion.trim() ||
      !this.direccionDispositivo.trim() ||
      !this.ipGateway.trim() ||
      !this.protocolo.trim() ||
      !this.equipoId.trim()
    ) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    if (this.disponeBateria) {
      if (
        !this.nombreBateria.trim() ||
        this.capacidadBateria <= 0
      ) {
        this.mensajeError = 'Por favor, complete los datos de la batería.';
        return;
      }
    }

    const sensor: Sensor = {
      nombre: this.nombre,
      marca: this.marca,
      referencia: this.referencia,
      modelo: this.modelo,
      propiedad: this.propiedad,
      fechaMantenimiento: this.fechaMantenimiento,
      precision: this.precision,
      frecuencia: this.frecuencia,
      descripcion: this.descripcion,
      direccionDispositivo: this.direccionDispositivo,
      ipGateway: this.ipGateway,
      protocolo: this.protocolo,
      disponeBateria: this.disponeBateria,
      nombreBateria: this.disponeBateria ? this.nombreBateria : undefined,
      capacidadBateria: this.disponeBateria ? this.capacidadBateria : undefined,
      equipoId: this.equipoId,
      tipo: this.tipo
    };

    this.dispositivoService.guardarSensor(sensor).subscribe({
      next: () => {
        console.log('✅ Sensor guardado correctamente');
        // alert('✅ Sensor guardado correctamente');
        this.router.navigate(['/view/sensors']);
      },
      error: (err) => {
        console.error('❌ Error al guardar sensor', err);
        alert('Error al guardar sensor');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/view/sensors']); // esto redirige
  }


}