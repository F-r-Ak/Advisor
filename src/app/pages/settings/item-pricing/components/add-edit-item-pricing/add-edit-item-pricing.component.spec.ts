import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemPricingComponent } from './add-edit-item-pricing.component';

describe('AddEditItemPricingComponent', () => {
  let component: AddEditItemPricingComponent;
  let fixture: ComponentFixture<AddEditItemPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditItemPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditItemPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
