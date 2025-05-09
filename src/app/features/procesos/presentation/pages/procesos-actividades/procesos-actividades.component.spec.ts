import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosActividadesComponent } from './procesos-actividades.component';

describe('ProcesosActividadesComponent', () => {
  let component: ProcesosActividadesComponent;
  let fixture: ComponentFixture<ProcesosActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesosActividadesComponent]
    });
    fixture = TestBed.createComponent(ProcesosActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
