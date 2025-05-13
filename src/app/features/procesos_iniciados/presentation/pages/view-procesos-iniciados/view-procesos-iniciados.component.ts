import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesoIniSummaryModel } from '../../../models/proceso.ini.summary.model';
import { ProcesoIniciadoService } from '../../../services/procesos.iniciados.service';

@Component({
  selector: 'app-view-procesos-iniciados',
  templateUrl: './view-procesos-iniciados.component.html',
  styleUrls: ['./view-procesos-iniciados.component.scss']
})
export class ViewProcesosIniciadosComponent implements OnInit {

  constructor( private router: Router, private procesoService: ProcesoIniciadoService) {}

  ngOnInit(): void {
    this.loadProcesosIniciados();
  }

  procesosIniciados: ProcesoIniSummaryModel[] = [];


  iniciarProceso(): void {
    this.router.navigate(['/start/proceso']); // esto redirige
  }

  finalizarProceso(): void {
    this.router.navigate(['/end/proceso']);
  }

  loadProcesosIniciados(): void {
  this.procesoService.getProcesosIniciados().subscribe({
    next: (data) => this.procesosIniciados = data,
    error: (err) => console.error('Error al cargar procesos iniciados:', err)
  });
}

}
