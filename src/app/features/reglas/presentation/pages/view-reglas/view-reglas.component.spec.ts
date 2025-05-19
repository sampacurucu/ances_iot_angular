import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReglasComponent } from './view-reglas.component';

describe('ViewReglasComponent', () => {
  let component: ViewReglasComponent;
  let fixture: ComponentFixture<ViewReglasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReglasComponent]
    });
    fixture = TestBed.createComponent(ViewReglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
