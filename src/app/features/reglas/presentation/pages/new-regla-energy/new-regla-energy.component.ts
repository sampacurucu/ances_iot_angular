import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReglasService } from '../../../services/reglas.service';
import { ProcesoIniSummaryModel } from 'src/app/features/procesos_iniciados/models/proceso.ini.summary.model';
import { DispositivoResumenModel } from 'src/app/features/areaproduccion/models/dispsitivo.resumen.model';
import { ReglaModel } from '../../../models/regla.model';
import { CondicionModel } from '../../../models/condicion.model';
import { ReglaEnergyModel } from '../../../models/regla.energy.model.model';

@Component({
  selector: 'app-new-regla-energy',
  templateUrl: './new-regla-energy.component.html',
  styleUrls: ['./new-regla-energy.component.scss']
})
export class NewReglaEnergyComponent implements OnInit {

  constructor( private router: Router, private reglaService: ReglasService) {}
  

  ngOnInit(): void {
    this.loadProcesosIniciados();
  }

  procesosIniciados: ProcesoIniSummaryModel[] = [];
  procesoSeleccionadoId: string = '';

  nombre: string = '';
  tipo: string = 'Energetica';
  frecuenciaActualizar: number = 0;

  operadores: string[] = ['Y', 'O'];
  operadorSeleccionado: string = '';

  dispositivos: DispositivoResumenModel[] = []; 
  dispositivoId: string = '';

  selectedDispositivo: DispositivoResumenModel | null = null;
  dispositivoAnteriorId: string = '';


  propiedadDispositivo: string = '';
  descripcion: string = '';

  // Variables para el modal de alerta
    modalAlertaActivo: boolean = false; 
    mensajeAlerta: string = '';

    mostrarModal = false;

  loadProcesosIniciados(): void {
    this.reglaService.getProcesosIniciados().subscribe({
      next: (data) => this.procesosIniciados = data,
      error: (err) => console.error('Error al cargar procesos iniciados:', err)
    });
  }

  onProcesoChange(): void {
    this.selectedDispositivo = null;
    this.dispositivoId = '';
    this.propiedadDispositivo = '';
    this.resetCamposRegla();
    const id = Number(this.procesoSeleccionadoId);

    this.reglaService.obtenerDispositivosByProcessStarted(this.procesoSeleccionadoId).subscribe({
      next: (data) => this.dispositivos = data,
      error: (err) => console.error('Error al cargar dispositivos:', err)
    });

  }

  onDispositivoChange(d: DispositivoResumenModel) {
    this.dispositivoId = d.id.toString();
    this.propiedadDispositivo = d.propiedad;
    this.resetCamposRegla();
  }

  abrirModal() {
      if (
        this.procesoSeleccionadoId &&
        // this.actividadSeleccionadaId &&
        this.operadorSeleccionado &&
        this.selectedDispositivo &&
        this.propiedadDispositivo &&
        this.descripcion &&
        this.frecuenciaActualizar &&
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

  mostrarModalAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.modalAlertaActivo = true;
  }

  cancelar(): void {
    this.router.navigate(['/view/reglas']); // esto redirige
  }


  //reglas
  // Método para guardar la regla 
    reglasParaGuardar: ReglaEnergyModel[] = [];
    reglaActual: ReglaEnergyModel | null = null;
  // para guardar las condiciones
  condicionNombre = '';
  condicionOperador = '';
  condicionPropiedad = '';
  condicionValor = 0;
  condicionDescripcion = '';

  operadores2 = ['>', '<', '==', '!='];

  condicionesTabla: {
    nombreRegla: string;
    // actividad: string;
    dispositivo: string;
    propiedad: string;
    operador: string;
    valor: number;
  }[] = [];
  
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
        
          this.reglaActual = {
            procesoIniciadoId: this.procesoSeleccionadoId,
            tipo: this.tipo,
            nombre: this.nombre,
            frecuencia: this.frecuenciaActualizar,
            operadorCondiciones: this.operadorSeleccionado,
            dispositivoId: this.dispositivoId,
            propiedad: this.propiedadDispositivo,
            descripcion: this.descripcion,
            condiciones: []
          };
          this.reglasParaGuardar.push(this.reglaActual);
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
          // actividad: this.activities.find(a => a.id === Number(this.actividadSeleccionadaId))?.name || '',
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

  cerrarModalAlerta() {
    this.modalAlertaActivo = false;
    this.mensajeAlerta = '';
  }

  resetCamposRegla(): void {
    this.nombre = '';
    this.operadorSeleccionado = '';
    this.descripcion = '';
    this.frecuenciaActualizar = 0;
  }

  guardarTodasLasReglas() {
  if (this.reglasParaGuardar.length === 0) {
    this.mostrarModalAlerta('No hay reglas para guardar.');
    return;
  }

  this.reglaService.guardarReglasEnergeticas(this.reglasParaGuardar).subscribe({
      next: (response) => {
        console.log('Reglas guardadas correctamente:', response);
        // Reset
        this.reglasParaGuardar = [];
        this.reglaActual = null;
        this.condicionesTabla = [];
        this.dispositivoAnteriorId = '';
        this.cancelar(); // redirige
      },
      error: (error) => {
        console.error('Error al guardar reglas:', error);
        this.mostrarModalAlerta('Error al guardar reglas.');
      }
    });
  }


}
