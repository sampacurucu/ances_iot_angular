import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcesosIniciadosComponent } from './view-procesos-iniciados.component';

describe('ViewProcesosIniciadosComponent', () => {
  let component: ViewProcesosIniciadosComponent;
  let fixture: ComponentFixture<ViewProcesosIniciadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProcesosIniciadosComponent]
    });
    fixture = TestBed.createComponent(ViewProcesosIniciadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
