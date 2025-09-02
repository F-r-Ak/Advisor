import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBranchsComponent } from './add-edit-branchs.component';

describe('AddEditItemPricingComponent', () => {
    let component: AddEditBranchsComponent;
    let fixture: ComponentFixture<AddEditBranchsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddEditBranchsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEditBranchsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
