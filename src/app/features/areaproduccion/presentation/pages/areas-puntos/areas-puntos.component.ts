import { Component, OnInit } from '@angular/core';
import { FarmModel } from '../../../models/farm.model';
import { AreaService } from '../../../services/area.service';
import { Router } from '@angular/router';
import { AreaSimpleModel } from '../../../models/area.simple.model';
import { PuntoModel } from '../../../models/punto.model';
import { DispositivoResumenModel } from '../../../models/dispsitivo.resumen.model';

@Component({
  selector: 'app-areas-puntos',
  templateUrl: './areas-puntos.component.html',
  styleUrls: ['./areas-puntos.component.scss']
})
export class AreasPuntosComponent implements OnInit {


constructor(private areaService: AreaService, private router: Router) {}

  ngOnInit(): void {
    this.areaService.getFincas().subscribe({
      next: (fincas) => {
        this.fincas = fincas;
      },
      error: (err) => {
        console.error('Error al cargar fincas:', err);
      }
    });

    this.areaService.obtenerDispositivos().subscribe({
      next: (dispositivos) => {
        this.dispositivos = dispositivos;
      },
      error: (err) => {
        console.error('Error al cargar dispositivos:', err);
      }
    });

  }


  // Variables para almacenar los datos de las fincas y areas
    fincas: FarmModel[] = []; 
    areas: AreaSimpleModel [] = [];

    finca: string = '';

    areaSeleccionadaId: string = '';
    imagenAreaSeleccionada: string | null = null;


  onFincaChange(event: any): void {
    const id = event.target.value;
    this.areaSeleccionadaId = '';
    this.imagenAreaSeleccionada = null;
    this.areaService.obtenerAreasByFarm(id).subscribe({
      next: (data) => this.areas = data,
      error: (err) => console.error('Error al cargar áreas por finca:', err)
    });
  }

  onAreaChange(event: any): void {
    const id = parseInt(event.target.value, 10);
    const area = this.areas.find(a => a.id === id);
    this.imagenAreaSeleccionada = area?.imagen || null;
  }


  marcadorActivo: boolean = false;
  marcadorX: number = 0;
  marcadorY: number = 0;

colocarMarcador(event: MouseEvent) {
  const imageBox = (event.currentTarget as HTMLElement).getBoundingClientRect();

  const clickX = event.clientX - imageBox.left;
  const clickY = event.clientY - imageBox.top;

  const porcentajeX = (clickX / imageBox.width) * 100;
  const porcentajeY = (clickY / imageBox.height) * 100;

  this.marcadorX = porcentajeX;
  this.marcadorY = porcentajeY;
  this.marcadorActivo = true;
}

mostrarModal = false;

abrirModal() {
  if (!this.marcadorActivo) {
    this.mostrarModalAlerta('Primero debe colocar un marcador.');
    return;
  }

  this.mostrarModal = true;
}

cerrarModal() {
  this.mostrarModal = false;
}


// Método para guardar el punto
// Datos del formulario
nombre: string = '';
referencia: string = '';
interior: boolean = false;
altura: number = 0;
descripcion: string = '';
dispositivoId: string = '';

// Lista de puntos
puntos: PuntoModel[] = [];


guardarPunto() {

  if (
    !this.nombre.trim() ||
    !this.referencia.trim() ||
    this.altura <= 0 ||
    !this.descripcion.trim() ||
    !this.dispositivoId
  ) {
    this.mostrarModalAlerta('Debe completar todos los campos del formulario antes de guardar.');
    return;
  }
  const nuevoPunto: PuntoModel = {
    nombre: this.nombre,
    referencia: this.referencia,
    interior: this.interior,
    altura: this.altura,
    descripcion: this.descripcion,
    dispositivoId: this.dispositivoId,
    areaId: parseInt(this.areaSeleccionadaId, 10),
    x: this.marcadorX,
    y: this.marcadorY
  };

  this.puntos.push(nuevoPunto);
  console.log('Punto guardado:', nuevoPunto);
  console.log('Lista de puntos acumulados:', this.puntos);
  this.cerrarModal();

  // Limpia campos del formulario
  this.nombre = '';
  this.referencia = '';
  this.interior = false;
  this.altura = 0;
  this.descripcion = '';
  this.dispositivoId = '';
  this.marcadorActivo = false;
}

dispositivos: DispositivoResumenModel[] = []; 

// Variables para el modal de alerta
modalAlertaActivo: boolean = false;
mensajeAlerta: string = '';

  mostrarModalAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.modalAlertaActivo = true;
  }

  cerrarModalAlerta() {
    this.modalAlertaActivo = false;
  }

  getNombreDispositivoById(id: string): string {
    const dispositivo = this.dispositivos.find(d => d.id === Number(id));
    return dispositivo ? dispositivo.nombre : 'Desconocido';
  }


  // Método para guardar los puntos
  guardarListaDePuntos() {
    if (this.puntos.length === 0) {
      this.mostrarModalAlerta('No hay puntos para guardar.');
      return;
    }
  
    this.areaService.guardarPuntos(this.puntos).subscribe({
      next: () => {
        console.log('Puntos guardados correctamente');
        this.puntos = []; // limpia la lista si deseas
        this.router.navigate(['/view/areas']);
      },
      error: (err) => {
        console.error('Error al guardar los puntos:', err);
        this.mostrarModalAlerta('Error al guardar los puntos.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/view/areas']); // esto redirige
  }
  
  

}
