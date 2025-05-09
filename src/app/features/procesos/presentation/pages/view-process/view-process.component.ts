import { Component, OnInit } from '@angular/core';
import { ProcessWithActivities } from '../../../models/process.activities.model';
import { ProcessService } from '../../../services/process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.scss']
})
export class ViewProcessComponent implements OnInit {

  processes: ProcessWithActivities[] = [];

  constructor(private processService: ProcessService, private router: Router) {}


  ngOnInit(): void {
    this.loadProcesses();
  }

  loadProcesses(): void {
    this.processService.getProcessesWithActivities().subscribe({
      next: (data) => this.processes = data,
      error: (err) => console.error('Error al cargar procesos', err)
    });
  }

  asignarActividades(): void {
    this.router.navigate(['/process/activity']); // esto redirige
  }

}
