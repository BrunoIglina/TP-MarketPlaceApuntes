import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradoComponent } from './comprado.component';

describe('CompradoComponent', () => {
  let component: CompradoComponent;
  let fixture: ComponentFixture<CompradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
