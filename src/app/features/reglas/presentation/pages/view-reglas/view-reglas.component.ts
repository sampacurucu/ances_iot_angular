import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-reglas',
  templateUrl: './view-reglas.component.html',
  styleUrls: ['./view-reglas.component.scss']
})
export class ViewReglasComponent {

  constructor( private router: Router) {}

  agregarRegla(): void {
    this.router.navigate(['/new/regla']); 
  }

}
