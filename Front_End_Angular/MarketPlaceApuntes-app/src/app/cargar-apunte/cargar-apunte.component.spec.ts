import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarApunteComponent } from './cargar-apunte.component';

describe('CargarApunteComponent', () => {
  let component: CargarApunteComponent;
  let fixture: ComponentFixture<CargarApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarApunteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
