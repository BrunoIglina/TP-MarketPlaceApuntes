import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApunteCompradoComponent } from './apunte-comprado.component';

describe('ApunteCompradoComponent', () => {
  let component: ApunteCompradoComponent;
  let fixture: ComponentFixture<ApunteCompradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApunteCompradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApunteCompradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
