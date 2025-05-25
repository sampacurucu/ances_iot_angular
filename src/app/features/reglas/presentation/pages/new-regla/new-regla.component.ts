import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReglasService } from '../../../services/reglas.service';
import { ProcesoIniSummaryModel } from 'src/app/features/procesos_iniciados/models/proceso.ini.summary.model';
import { ActivityModel } from 'src/app/features/procesos/models/activity.model';
import { DispositivoResumenModel } from 'src/app/features/areaproduccion/models/dispsitivo.resumen.model';
import { ReglaModel } from '../../../models/regla.model';
import { CondicionModel } from '../../../models/condicion.model';

@Component({
  selector: 'app-new-regla',
  templateUrl: './new-regla.component.html',
  styleUrls: ['./new-regla.component.scss']
})
export class NewReglaComponent implements OnInit {

  constructor( private router: Router, private reglaService: ReglasService) {}

ngOnInit(): void {
  this.loadProcesosIniciados();
}

  procesosIniciados: ProcesoIniSummaryModel[] = [];
  procesoSeleccionadoId: string = '';

  activities: ActivityModel[] = [];
  actividadSeleccionadaId: string = '';

  operadores: string[] = ['AND', 'OR'];
  operadorSeleccionado: string = '';


  dispositivos: DispositivoResumenModel[] = []; 
  dispositivoId: string = '';

  selectedDispositivo: DispositivoResumenModel | null = null;

  propiedadDispositivo: string = '';

  nombre: string = '';
  tipo: string = 'Deteccion de actividad';
  descripcion: string = '';

  // Variables para el modal de alerta
    modalAlertaActivo: boolean = false; 
    mensajeAlerta: string = '';

  mostrarModalAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.modalAlertaActivo = true;
  }

  cerrarModalAlerta() {
    this.modalAlertaActivo = false;
    this.mensajeAlerta = '';
  }

  loadProcesosIniciados(): void {
    this.reglaService.getProcesosIniciados().subscribe({
      next: (data) => this.procesosIniciados = data,
      error: (err) => console.error('Error al cargar procesos iniciados:', err)
    });
  }

    onProcesoChange(): void {
    this.actividadSeleccionadaId = '';
    this.dispositivoId = '';
    const id = Number(this.procesoSeleccionadoId);
    if (!isNaN(id)) {
      this.reglaService.getActivitiesByProcessStarted(id).subscribe({
        next: (data) => this.activities = data,
        error: (err) => console.error('Error al cargar actividades:', err)
      });
    }

    this.reglaService.obtenerDispositivosByProcessStarted(this.procesoSeleccionadoId).subscribe({
      next: (data) => this.dispositivos = data,
      error: (err) => console.error('Error al cargar dispositivos:', err)
    });

  }

  onDispositivoChange(d: DispositivoResumenModel) {
    this.dispositivoId = d.id.toString();
    this.propiedadDispositivo = d.propiedad;
  }

      mostrarModal = false;

      condicionNombre = '';
      condicionOperador = '';
      condicionPropiedad = '';
      condicionValor = 0;
      condicionDescripcion = '';

      operadores2 = ['>', '<', '==', '!='];

      // abrirModal() {
      //   this.mostrarModal = true;
      // }

    abrirModal() {
      if (
        this.procesoSeleccionadoId &&
        this.actividadSeleccionadaId &&
        this.operadorSeleccionado &&
        this.selectedDispositivo &&
        this.propiedadDispositivo &&
        this.descripcion &&
        this.nombre
      ) {
        this.mostrarModal = true;
      } else {
        this.mensajeAlerta= 'Debe completar todos los campos del formulario antes de agregar una condición.';
        this.mostrarModalAlerta(this.mensajeAlerta);
      }
    }


    cerrarModal() {
      this.mostrarModal = false;
    }

    guardarCondicion() {
    if (this.validarCamposCondicion()) {
      console.log('Condición guardada:', {
        nombre: this.condicionNombre.trim(),
        operador: this.condicionOperador.trim(),
        // propiedad: this.condicionPropiedad.trim(),
        valor: this.condicionValor,
        descripcion: this.condicionDescripcion.trim()
      });
      if (this.dispositivoId !== this.dispositivoAnteriorId || !this.reglaActual) {
      // if (this.actividadSeleccionadaId !== this.actividadAnteriorId || !this.reglaActual) {
        // Cambió la actividad → nueva regla
        this.reglaActual = {
          procesoIniciadoId: this.procesoSeleccionadoId,
          tipo: this.tipo,
          nombre: this.nombre,
          actividadId: this.actividadSeleccionadaId,
          operadorCondiciones: this.operadorSeleccionado,
          dispositivoId: this.dispositivoId,
          propiedad: this.propiedadDispositivo,
          descripcion: this.descripcion,
          condiciones: []
        };
        this.reglasParaGuardar.push(this.reglaActual);
        // this.actividadAnteriorId = this.actividadSeleccionadaId;
        this.dispositivoAnteriorId = this.dispositivoId;
      }

      // Agregar la condición actual a la regla activa
      const nuevaCondicion: CondicionModel = {
        nombre: this.condicionNombre.trim(),
        operador: this.condicionOperador.trim(),
        propiedad: this.propiedadDispositivo,
        valor: this.condicionValor,
        descripcion: this.condicionDescripcion.trim()
      };

      this.reglaActual.condiciones.push(nuevaCondicion);

      this.condicionesTabla.push({
        nombreRegla: this.nombre,
        actividad: this.activities.find(a => a.id === Number(this.actividadSeleccionadaId))?.name || '',
        dispositivo: this.selectedDispositivo?.nombre || '',
        propiedad: this.propiedadDispositivo,
        operador: this.condicionOperador.trim(),
        valor: this.condicionValor
      });

      
      console.log('Regla actualizada:', this.reglasParaGuardar);

      this.cerrarModal();
      this.limpiarCamposCondicion();
    } else {
      this.mostrarModalAlerta('Debe completar todos los campos del modal antes de guardar la condición.');
    }
  }

  validarCamposCondicion(): boolean {
    return (
      this.condicionNombre.trim() !== '' &&
      this.condicionOperador !== '' &&
      // this.condicionPropiedad.trim() !== '' &&
      this.condicionValor !== 0 &&
      this.condicionDescripcion.trim() !== ''
    );
  }

  limpiarCamposCondicion() {
    this.condicionNombre = '';
    this.condicionOperador = '';
    this.condicionValor = 0;
    this.condicionDescripcion = '';
  }

  resetCamposRegla(): void {
    this.nombre = '';
    this.operadorSeleccionado = '';
    this.selectedDispositivo = null;
    this.dispositivoId = '';
    this.propiedadDispositivo = '';
    this.descripcion = '';
  }

  resetCamposRegla2(): void {
    this.nombre = '';
    this.operadorSeleccionado = '';
    this.descripcion = '';
  }



  // Método para guardar la regla 
  reglasParaGuardar: ReglaModel[] = [];
  reglaActual: ReglaModel | null = null;
  // actividadAnteriorId: string = '';
  dispositivoAnteriorId: string = '';


  condicionesTabla: {
    nombreRegla: string;
    actividad: string;
    dispositivo: string;
    propiedad: string;
    operador: string;
    valor: number;
  }[] = [];



    guardarTodasLasReglas() {
    if (this.reglasParaGuardar.length === 0) {
      this.mostrarModalAlerta('No hay reglas para guardar.');
      return;
    }

    this.reglaService.guardarReglas(this.reglasParaGuardar).subscribe({
      next: (response) => {
        // console.log('Reglas guardadas correctamente:', response);
        // this.mostrarModalAlerta('Reglas guardadas correctamente.');
        this.reglasParaGuardar = [];
        this.reglaActual = null;
        // this.actividadAnteriorId = '';
        this.dispositivoAnteriorId = '';
        this.router.navigate(['/view/reglas']); 
      },
      error: (error) => {
        console.error('Error al guardar reglas:', error);
        // this.mostrarModalAlerta('Error al guardar reglas.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/view/reglas']); // esto redirige
  }

}
