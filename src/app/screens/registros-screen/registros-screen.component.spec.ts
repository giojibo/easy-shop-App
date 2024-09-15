import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosScreenComponent } from './registros-screen.component';

describe('RegistrosScreenComponent', () => {
  let component: RegistrosScreenComponent;
  let fixture: ComponentFixture<RegistrosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrosScreenComponent]
    });
    fixture = TestBed.createComponent(RegistrosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
