import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProducts } from './compare-products';

describe('CompareProducts', () => {
  let component: CompareProducts;
  let fixture: ComponentFixture<CompareProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
