import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVendedorComponent } from './registrar-vendedor.component';

describe('RegistrarVendedorComponent', () => {
  let component: RegistrarVendedorComponent;
  let fixture: ComponentFixture<RegistrarVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarVendedorComponent]
    });
    fixture = TestBed.createComponent(RegistrarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
