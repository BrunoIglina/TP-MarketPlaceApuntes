import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajasMateriasComponent } from './bajas-materias.component';

describe('BajasMateriasComponent', () => {
  let component: BajasMateriasComponent;
  let fixture: ComponentFixture<BajasMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajasMateriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajasMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
