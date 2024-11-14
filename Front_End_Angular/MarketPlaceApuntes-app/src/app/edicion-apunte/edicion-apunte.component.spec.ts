import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionApunteComponent } from './edicion-apunte.component';

describe('EdicionApunteComponent', () => {
  let component: EdicionApunteComponent;
  let fixture: ComponentFixture<EdicionApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionApunteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
