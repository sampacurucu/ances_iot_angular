import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcesoComponent } from './end-proceso.component';

describe('EndProcesoComponent', () => {
  let component: EndProcesoComponent;
  let fixture: ComponentFixture<EndProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndProcesoComponent]
    });
    fixture = TestBed.createComponent(EndProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
