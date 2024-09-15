import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoresScreenComponent } from './vendedores-screen.component';

describe('VendedoresScreenComponent', () => {
  let component: VendedoresScreenComponent;
  let fixture: ComponentFixture<VendedoresScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendedoresScreenComponent]
    });
    fixture = TestBed.createComponent(VendedoresScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
