import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NewAreaComponent } from './presentation/pages/new-area/new-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NewAreaComponent } from './pages/new-area/new-area.component';
import { ViewAreasComponent } from './pages/view-areas/view-areas.component';
import { AreasPuntosComponent } from './pages/areas-puntos/areas-puntos.component';

@NgModule({
  declarations: [NewAreaComponent, ViewAreasComponent, AreasPuntosComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule 
  ]
})
export class AreaproduccionModule {
    
}