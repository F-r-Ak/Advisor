import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegionsComponent } from './add-edit-regions.component';

describe('AddEditItemPricingComponent', () => {
    let component: AddEditRegionsComponent;
    let fixture: ComponentFixture<AddEditRegionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddEditRegionsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEditRegionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
