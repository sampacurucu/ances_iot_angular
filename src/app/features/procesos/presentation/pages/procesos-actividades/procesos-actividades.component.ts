import { Component, OnInit } from '@angular/core';
import { ProcessModel } from '../../../models/process.model';
import { ProcessService } from '../../../services/process.service';
import { ActivityModel } from '../../../models/activity.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-procesos-actividades',
  templateUrl: './procesos-actividades.component.html',
  styleUrls: ['./procesos-actividades.component.scss']
})
export class ProcesosActividadesComponent implements OnInit {

  procesos: ProcessModel[] = [];
  selectedProcesoId: string = '';

  actividades: ActivityModel[] = [];
  selectedActividadId: string = '';

  actividadesAsignadas: ActivityModel[] = [];
  selectedActividadAsignadaId: number | null = null;

  mensajeError: string = '';



  constructor(
    private processService: ProcessService,private router: Router) {}


  ngOnInit(): void {
    this.loadProcesos();
    this.loadActividades();
  }

  //cargar los procesos y actividades
  loadProcesos(): void {
    this.processService.getAllProcesses().subscribe({
      next: (data) => this.procesos = data,
      error: (err) => console.error('Error al cargar procesos:', err)
    });
  }

  
  loadActividades(): void {
    this.processService.getAllActivities().subscribe({
      next: (data) => this.actividades = data,
      error: (err) => console.error('Error al cargar actividades:', err)
    });
  }

  // Método para asignar actividad a un proceso
  asignarActividad(): void {
    const actividad = this.actividades.find(a => a.id === +this.selectedActividadId);
  
    // Verifica que no esté ya asignada
    const yaExiste = this.actividadesAsignadas.some(a => a.id === actividad?.id);
  
    if (actividad && !yaExiste) {
      this.actividadesAsignadas.push(actividad);
    }
  }

  // Método para eliminar actividad asignada
  seleccionarActividad(actividadId: number): void {
    this.selectedActividadAsignadaId = actividadId;
  }

  eliminarActividad(): void {
    if (this.selectedActividadAsignadaId !== null) {
      this.actividadesAsignadas = this.actividadesAsignadas.filter(
        a => a.id !== this.selectedActividadAsignadaId
      );
      this.selectedActividadAsignadaId = null;
    }
  }

  onProcesoChange(): void {
    this.actividadesAsignadas = [];
    this.selectedActividadAsignadaId = null;
    this.selectedActividadId = '';
  }

  guardarAsignaciones(): void {
    const procesoId = +this.selectedProcesoId;
    const actividadIds = this.actividadesAsignadas.map(a => a.id);
  
    if (!procesoId || actividadIds.length === 0) {
      this.mensajeError = 'Debe seleccionar un proceso y al menos una actividad.';
      return;
    }
  
    this.processService.guardarRelacionesProcesoActividades(procesoId, actividadIds).subscribe({
      next: () => {
        console.log('Relaciones guardadas exitosamente.');
        // Opcional: reset
        this.actividadesAsignadas = [];
        this.selectedActividadAsignadaId = null;
        this.router.navigate(['/view/process']);
      },
      error: (err) => {
        console.error('Error al guardar relaciones:', err);
        this.mensajeError = 'Ocurrió un error al guardar.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/view/process']); // esto redirige
  }
  

}
