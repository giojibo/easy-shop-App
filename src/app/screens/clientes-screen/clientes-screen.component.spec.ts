import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesScreenComponent } from './clientes-screen.component';

describe('ClientesScreenComponent', () => {
  let component: ClientesScreenComponent;
  let fixture: ComponentFixture<ClientesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesScreenComponent]
    });
    fixture = TestBed.createComponent(ClientesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
