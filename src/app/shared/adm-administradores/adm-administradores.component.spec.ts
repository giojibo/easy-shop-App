import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAdministradoresComponent } from './adm-administradores.component';

describe('AdmAdministradoresComponent', () => {
  let component: AdmAdministradoresComponent;
  let fixture: ComponentFixture<AdmAdministradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmAdministradoresComponent]
    });
    fixture = TestBed.createComponent(AdmAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
