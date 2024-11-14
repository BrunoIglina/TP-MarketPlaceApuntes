import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraApunteComponent } from './compra-apunte.component';

describe('CompraApunteComponent', () => {
  let component: CompraApunteComponent;
  let fixture: ComponentFixture<CompraApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraApunteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
