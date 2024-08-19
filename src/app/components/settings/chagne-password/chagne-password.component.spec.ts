import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChagnePasswordComponent } from './chagne-password.component';

describe('ChagnePasswordComponent', () => {
  let component: ChagnePasswordComponent;
  let fixture: ComponentFixture<ChagnePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChagnePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChagnePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
