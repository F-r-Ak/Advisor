import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSallerCategoryComponent } from './add-edit-saller-category.component';

describe('AddEditItemPricingComponent', () => {
    let component: AddEditSallerCategoryComponent;
    let fixture: ComponentFixture<AddEditSallerCategoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddEditSallerCategoryComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEditSallerCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
