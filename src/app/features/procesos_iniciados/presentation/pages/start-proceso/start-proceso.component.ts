import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaSimpleModel } from 'src/app/features/areaproduccion/models/area.simple.model';
import { FarmModel } from 'src/app/features/areaproduccion/models/farm.model';
import { AreaService } from 'src/app/features/areaproduccion/services/area.service';
import { CropSummaryModel } from '../../../models/crop.summary.model';
import { ProcesoIniciadoService } from '../../../services/procesos.iniciados.service';
import { ProcessModel } from 'src/app/features/procesos/models/process.model';
import { SmartPointSimpleModel } from '../../../models/smart.point.simple.model';

@Component({
  selector: 'app-start-proceso',
  templateUrl: './start-proceso.component.html',
  styleUrls: ['./start-proceso.component.scss']
})
export class StartProcesoComponent implements OnInit {

  constructor(private areaService: AreaService, private procesoService: ProcesoIniciadoService, 
    private router: Router) {}
  
    ngOnInit(): void {
      this.areaService.getFincas().subscribe({
        next: (fincas) => {
          this.fincas = fincas;
        },
        error: (err) => {
          console.error('Error al cargar fincas:', err);
        }
      });
      this.loadProcesos();
      this.loadAgricultores();
    }

  // Variables para almacenar los datos de las fincas y id
    selectedFincaId: string = '';
    fincas: FarmModel[] = []; 
    

// Variables para almacenar los datos de las áreas 
    areas: AreaSimpleModel [] = [];
    areaSeleccionadaId: string = '';
    imagenAreaSeleccionada: string | null = null;


    // Variables para almacenar los crops
    crops: CropSummaryModel[] = [];
    selectedCropId: string = '';

    // Variables para almacenar los procesos
    procesos: ProcessModel[] = [];
    selectedProcesoId: string = '';

    //variables para almacenar los agricultores
    farmers: FarmModel[] = [];
    selectedAgricultorId: string = '';

    // Variables para almacenar los puntos
    puntos: SmartPointSimpleModel[] = [];
    selectedFechaInicio: string = '';


    onFincaChange(event: any): void {
    const id = event.target.value;
    this.areaSeleccionadaId = '';
    this.imagenAreaSeleccionada = null;

    this.areaService.obtenerAreasByFarm(id).subscribe({
      next: (data) => this.areas = data,
      error: (err) => console.error('Error al cargar áreas por finca:', err)
    });

    this.procesoService.obtenerAreasByFarm(id).subscribe({
      next: (data) => this.crops = data,
      error: (err) => console.error('Error al cargar cultivos:', err)
    });

  }

   onAreaChange(event: any): void {
    // const id = event.target.value;
    const id = parseInt(event.target.value, 10);
    const area = this.areas.find(a => a.id === id);
    this.imagenAreaSeleccionada = area?.imagen || null;

    this.loadPuntosByArea(id.toString());
  }  

   loadProcesos(): void {
    this.procesoService.getAllProcesses().subscribe({
      next: (data) => this.procesos = data,
      error: (err) => console.error('Error al cargar procesos:', err)
    });
  }

  loadAgricultores(): void {
    this.procesoService.getAllFarmers().subscribe({
      next: (data) => this.farmers = data,
      error: (err) => console.error('Error al cargar agricultores:', err)
    });
  }

  loadPuntosByArea(areaId: string): void {
    this.procesoService.obtenerPuntosByArea(areaId).subscribe({
      next: (data) => this.puntos = data,
      error: (err) => console.error('Error al cargar puntos:', err)
    });
  }

  iniciarProceso(): void {
  console.log('Iniciar proceso con:');
  console.log('Finca:', this.selectedFincaId);
  console.log('Cultivo:', this.selectedCropId);
  console.log('Proceso:', this.selectedProcesoId);
  console.log('Agricultor:', this.selectedAgricultorId);
  console.log('Área:', this.areaSeleccionadaId);
  console.log('Fecha:', this.selectedFechaInicio);
}

cancelar(): void {
  this.router.navigate(['/view/procesos/iniciados']);
}

}
