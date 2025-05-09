import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './shared/components/header/header.component';
import { NewAreaComponent } from './features/areaproduccion/presentation/pages/new-area/new-area.component';
import { HomeComponent } from './features/home/presentation/pages/home/home.component';
import { AreaproduccionModule } from './features/areaproduccion/presentation/new-area.module';
import { HomeModule } from './features/home/home.module';
import { SharedModule } from "./shared/shared.module";
import { ProcesosActividadesComponent } from './features/procesos/presentation/pages/procesos-actividades/procesos-actividades.component';
import { ViewProcessComponent } from './features/procesos/presentation/pages/view-process/view-process.component';
import { NewSensorComponent } from './features/dispositivos/presentation/pages/new-sensor/new-sensor.component';
import { ViewSensorComponent } from './features/dispositivos/presentation/pages/view-sensor/view-sensor.component';
import { GestionAgricolaComponent } from './features/gestionagricola/presentation/pages/gestion-agricola/gestion-agricola.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcesosActividadesComponent,
    ViewProcessComponent,
    NewSensorComponent,
    ViewSensorComponent,
    GestionAgricolaComponent,
    // HomeComponent,
    // HeaderComponent,
    // NewAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    AreaproduccionModule,
    SharedModule,
    HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
