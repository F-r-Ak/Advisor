import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricingComponent } from './item-pricing.component';

describe('ItemPricingComponent', () => {
  let component: ItemPricingComponent;
  let fixture: ComponentFixture<ItemPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
