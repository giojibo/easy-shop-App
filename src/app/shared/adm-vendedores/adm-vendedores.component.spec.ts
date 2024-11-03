import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmVendedoresComponent } from './adm-vendedores.component';

describe('AdmVendedoresComponent', () => {
  let component: AdmVendedoresComponent;
  let fixture: ComponentFixture<AdmVendedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmVendedoresComponent]
    });
    fixture = TestBed.createComponent(AdmVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
