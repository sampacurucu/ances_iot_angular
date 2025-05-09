import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../services/area.service';
import { AreaViewModel } from '../../../models/area.view.model';
import { Router } from '@angular/router';
// import { AreaViewModel } from 'src/app/models/area-view.model';


@Component({
  selector: 'app-view-areas',
  templateUrl: './view-areas.component.html',
  styleUrls: ['./view-areas.component.scss']
})
export class ViewAreasComponent   implements OnInit{

  areas: AreaViewModel[] = [];
  areaSeleccionada: AreaViewModel | null = null;

  constructor(private areaService: AreaService, private router: Router) {}
  ngOnInit(): void {
    this.areaService.obtenerAreas().subscribe({
      next: (data) => this.areas = data,
      error: (err) => console.error('Error al cargar áreas', err)
    });
  }

  visualizarImagen(area: AreaViewModel): void {
    this.areaSeleccionada = area;
  }

  agregar(): void {
    this.router.navigate(['/areaproduccion/newarea']); // esto redirige
  }

  agregarPuntos(): void {
    this.router.navigate(['/view/area/puntos']); // esto redirige
  }



}
