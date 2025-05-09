import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAreaComponent } from './features/areaproduccion/presentation/pages/new-area/new-area.component';
import { HomeComponent } from './features/home/presentation/pages/home/home.component';
import { ViewAreasComponent } from './features/areaproduccion/presentation/pages/view-areas/view-areas.component';
import { ProcesosActividadesComponent } from './features/procesos/presentation/pages/procesos-actividades/procesos-actividades.component';
import { ViewProcessComponent } from './features/procesos/presentation/pages/view-process/view-process.component';
import { NewSensorComponent } from './features/dispositivos/presentation/pages/new-sensor/new-sensor.component';
import { ViewSensorComponent } from './features/dispositivos/presentation/pages/view-sensor/view-sensor.component';
import { AreasPuntosComponent } from './features/areaproduccion/presentation/pages/areas-puntos/areas-puntos.component';
import { GestionAgricolaComponent } from './features/gestionagricola/presentation/pages/gestion-agricola/gestion-agricola.component';
const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'gestion/agricola', component: GestionAgricolaComponent },
  { path: 'areaproduccion/newarea', component: NewAreaComponent },
  { path: 'view/areas', component: ViewAreasComponent },
  { path: 'process/activity', component: ProcesosActividadesComponent },
  { path: 'view/process', component: ViewProcessComponent },
  { path: 'dispositivos/newsensor', component: NewSensorComponent },
  { path: 'view/sensors', component: ViewSensorComponent },
  { path: 'view/area/puntos', component: AreasPuntosComponent },
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
