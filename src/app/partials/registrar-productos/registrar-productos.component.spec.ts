import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProductoComponent } from './registrar-productos.component';

describe('RegistrarProductosComponent', () => {
  let component: RegistrarProductoComponent;
  let fixture: ComponentFixture<RegistrarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarProductoComponent]
    });
    fixture = TestBed.createComponent(RegistrarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
