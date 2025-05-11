import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-procesos-iniciados',
  templateUrl: './view-procesos-iniciados.component.html',
  styleUrls: ['./view-procesos-iniciados.component.scss']
})
export class ViewProcesosIniciadosComponent {

  constructor( private router: Router) {}

   iniciarProceso(): void {
    this.router.navigate(['/start/proceso']); // esto redirige
  }

}
