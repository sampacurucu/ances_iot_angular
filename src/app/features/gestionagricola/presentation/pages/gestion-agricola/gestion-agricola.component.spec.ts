import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgricolaComponent } from './gestion-agricola.component';

describe('GestionAgricolaComponent', () => {
  let component: GestionAgricolaComponent;
  let fixture: ComponentFixture<GestionAgricolaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAgricolaComponent]
    });
    fixture = TestBed.createComponent(GestionAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
