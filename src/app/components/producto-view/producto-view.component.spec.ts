import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoViewComponent } from './producto-view.component';

describe('ProductoViewComponent', () => {
  let component: ProductoViewComponent;
  let fixture: ComponentFixture<ProductoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoViewComponent]
    });
    fixture = TestBed.createComponent(ProductoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
