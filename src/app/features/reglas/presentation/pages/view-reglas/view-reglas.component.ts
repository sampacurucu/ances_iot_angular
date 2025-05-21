import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesoIniSummaryModel } from 'src/app/features/procesos_iniciados/models/proceso.ini.summary.model';
import { ReglasService } from '../../../services/reglas.service';
import { ReglaViewModel } from '../../../models/regla.view.model';
import { ReglaEnergyViewModel } from '../../../models/regla.energy.view.model';

@Component({
  selector: 'app-view-reglas',
  templateUrl: './view-reglas.component.html',
  styleUrls: ['./view-reglas.component.scss']
})
export class ViewReglasComponent implements OnInit {

  constructor( private router: Router, private reglaService: ReglasService) {}

  ngOnInit(): void {
  this.loadProcesosIniciados();
  }

  procesosIniciados: ProcesoIniSummaryModel[] = [];
  procesoSeleccionadoId: string = '';

  loadProcesosIniciados(): void {
    this.reglaService.getProcesosIniciados().subscribe({
      next: (data) => this.procesosIniciados = data,
      error: (err) => console.error('Error al cargar procesos iniciados:', err)
    });
  }

  reglasPlanas: ReglaViewModel[] = [];

  loadReglasPorProceso(procesoId: string): void {
    this.reglaService.getReglasPorProceso(procesoId).subscribe({
      next: (data) => {
        this.reglasPlanas = data;
      },
      error: (err) => console.error('Error al cargar reglas:', err)
    });
  }

  reglasEnergeticas: ReglaEnergyViewModel[] = [];
  loadReglasEPorProceso(procesoId: string): void {
    this.reglaService.getReglasEPorProceso(procesoId).subscribe({
      next: (data) => {
        this.reglasEnergeticas = data;
      },
      error: (err) => console.error('Error al cargar reglas energeticas:', err)
    });
  }

  agregarRegla(): void {
    this.router.navigate(['/new/regla']); 
  }

   agregarRegla2(): void {
    this.router.navigate(['/new/regla/energy']); 
  }

  onProcesoSeleccionado(): void {
    if (this.procesoSeleccionadoId) {
      this.loadReglasPorProceso(this.procesoSeleccionadoId);
      this.loadReglasEPorProceso(this.procesoSeleccionadoId);
    }
  }

}
