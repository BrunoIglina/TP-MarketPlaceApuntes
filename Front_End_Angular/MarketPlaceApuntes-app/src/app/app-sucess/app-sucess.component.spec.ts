import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSucessComponent } from './app-sucess.component';

describe('AppSucessComponent', () => {
  let component: AppSucessComponent;
  let fixture: ComponentFixture<AppSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSucessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
