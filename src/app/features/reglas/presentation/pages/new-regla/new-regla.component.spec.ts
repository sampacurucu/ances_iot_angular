import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReglaComponent } from './new-regla.component';

describe('NewReglaComponent', () => {
  let component: NewReglaComponent;
  let fixture: ComponentFixture<NewReglaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReglaComponent]
    });
    fixture = TestBed.createComponent(NewReglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
