import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClientCategoryComponent } from './add-edit-client-category.component';

describe('AddEditItemPricingComponent', () => {
    let component: AddEditClientCategoryComponent;
    let fixture: ComponentFixture<AddEditClientCategoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddEditClientCategoryComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEditClientCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
