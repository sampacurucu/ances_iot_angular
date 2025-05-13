import { Component, OnInit } from '@angular/core';
import { ProcesoIniSummaryModel } from '../../../models/proceso.ini.summary.model';
import { Router } from '@angular/router';
import { ProcesoIniciadoService } from '../../../services/procesos.iniciados.service';
import { ResultadoCalidadModel } from '../../../models/resultado.calidad.model';

@Component({
  selector: 'app-end-proceso',
  templateUrl: './end-proceso.component.html',
  styleUrls: ['./end-proceso.component.scss']
})
export class EndProcesoComponent implements OnInit {

  constructor( private router: Router, private procesoService: ProcesoIniciadoService) {}
  
  ngOnInit(): void {
    this.loadProcesosIniciados();
  }

   // Variables vinculadas al formulario
  // procesoSeleccionadoId: number | null = null;
  procesoSeleccionadoId: string = '';
  fechaFin: string = '';
  estado: string = '';
  cantidadProducida: number | null = null;
  observaciones: string = '';
  recomendaciones: string = '';


  procesosIniciados: ProcesoIniSummaryModel[] = [];

  mensajeError: string = '';


    loadProcesosIniciados(): void {
    this.procesoService.getProcesosIniciados().subscribe({
      next: (data) => this.procesosIniciados = data,
      error: (err) => console.error('Error al cargar procesos iniciados:', err)
    });
  }

    validarCampos(): boolean {
    if (
      this.procesoSeleccionadoId === null ||
      this.fechaFin.trim() === '' ||
      this.estado.trim() === '' ||
      this.cantidadProducida === null ||
      this.observaciones.trim() === '' ||
      this.recomendaciones.trim() === ''
    ) {
      this.mensajeError = 'Debe completar todos los campos antes de finalizar el proceso.';
      return false;
    }

    this.mensajeError = '';
    return true;
  }

  finalizarProceso(): void {
    if (!this.validarCampos()) {
      return;
    }

     // 1. Actualizar fecha fin del proceso
    this.procesoService.actualizarFechaFin(this.procesoSeleccionadoId!, this.fechaFin).subscribe({
      next: () => {
        // 2. Guardar resultado de calidad
        const resultado: ResultadoCalidadModel = {
          procesoId: this.procesoSeleccionadoId,
          estado: this.estado,
          cantidadProducida: this.cantidadProducida!,
          observaciones: this.observaciones,
          recomendaciones: this.recomendaciones
        };

        this.procesoService.guardarResultadoCalidad(resultado).subscribe({
          next: () => this.router.navigate(['/view/procesos/iniciados']),
          error: () => this.mensajeError = 'Error al guardar resultado de calidad.'
        });
      },
      error: () => this.mensajeError = 'Error al actualizar fecha de fin.'
    });

    // Si pasa la validación, continúa con el envío al backend
    console.log('Formulario válido. Procesando...');
  }

  cancelar(): void {
    this.router.navigate(['/view/procesos/iniciados']);
  }


}
