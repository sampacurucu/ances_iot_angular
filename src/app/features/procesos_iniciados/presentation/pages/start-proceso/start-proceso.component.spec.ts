import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProcesoComponent } from './start-proceso.component';

describe('StartProcesoComponent', () => {
  let component: StartProcesoComponent;
  let fixture: ComponentFixture<StartProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartProcesoComponent]
    });
    fixture = TestBed.createComponent(StartProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
