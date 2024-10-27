import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonClientesComponent } from './admon-clientes.component';

describe('AdmonClientesComponent', () => {
  let component: AdmonClientesComponent;
  let fixture: ComponentFixture<AdmonClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmonClientesComponent]
    });
    fixture = TestBed.createComponent(AdmonClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
