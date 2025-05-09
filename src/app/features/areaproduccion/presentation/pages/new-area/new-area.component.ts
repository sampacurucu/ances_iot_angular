import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../services/area.service';
import { AreaModel } from '../../../models/area.model';
import { FarmModel } from '../../../models/farm.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrls: ['./new-area.component.scss']
})
export class NewAreaComponent implements OnInit {

  constructor(private areaService: AreaService, private router: Router) {}
 
  ngOnInit(): void {
    this.areaService.getFincas().subscribe({
      next: (fincas) => {
        this.fincas = fincas;
      },
      error: (err) => {
        console.error('Error al cargar fincas:', err);
      }
    });
  }

// Variables para almacenar los datos de las fincas
  fincas: FarmModel[] = []; 

   // Variables que capturan los datos del formulario
   nombre: string = '';
   finca: string = '';
   ubicacion: string = '';
   correspondencia: string = '';
   mensajeError: string = '';



   // Variable para almacenar la imagen seleccionada
   selectedImage: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;


  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

// Método para agregar el área
  agregarArea() {
    if (
      !this.nombre.trim() ||
      !this.finca ||
      !this.ubicacion.trim() ||
      !this.correspondencia ||
      !this.imagePreview
    ) {
      this.mensajeError = 'Por favor, complete todos los campos antes de continuar.';
      return;
    }

    const  area:AreaModel = {
      name: this.nombre,
      fincaId: this.finca,
      ubicacion: this.ubicacion,
      correspondencia: this.correspondencia
    };
  
    const formData = new FormData();

  formData.append('area', new Blob([JSON.stringify(area)], { type: 'application/json' }));
  if (this.selectedImage) {
    formData.append('imagen', this.selectedImage);
  }

  this.areaService.guardarArea(formData).subscribe({
    next: (res) => {
      console.log('Área guardada exitosamente:', res);
      this.router.navigate(['/view/areas']); // esto redirige
    },
    error: (err) => {
      console.error('Error al guardar área:', err);
    }
  });
  }

  cancelar(): void {
    this.router.navigate(['/view/areas']); // esto redirige
  }
  
}
