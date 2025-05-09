import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasPuntosComponent } from './areas-puntos.component';

describe('AreasPuntosComponent', () => {
  let component: AreasPuntosComponent;
  let fixture: ComponentFixture<AreasPuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasPuntosComponent]
    });
    fixture = TestBed.createComponent(AreasPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
