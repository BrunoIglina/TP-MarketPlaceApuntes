import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajasApuntesComponent } from './bajas-apuntes.component';

describe('BajasApuntesComponent', () => {
  let component: BajasApuntesComponent;
  let fixture: ComponentFixture<BajasApuntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajasApuntesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajasApuntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
