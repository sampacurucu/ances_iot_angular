import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReglaEnergyComponent } from './new-regla-energy.component';

describe('NewReglaEnergyComponent', () => {
  let component: NewReglaEnergyComponent;
  let fixture: ComponentFixture<NewReglaEnergyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReglaEnergyComponent]
    });
    fixture = TestBed.createComponent(NewReglaEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
