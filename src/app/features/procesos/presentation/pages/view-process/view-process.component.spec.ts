import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcessComponent } from './view-process.component';

describe('ViewProcessComponent', () => {
  let component: ViewProcessComponent;
  let fixture: ComponentFixture<ViewProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProcessComponent]
    });
    fixture = TestBed.createComponent(ViewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
