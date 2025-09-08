import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, ItemsService } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { ItemTabs } from '../../../../core/enums/items-tabs';

@Component({
    selector: 'app-add-edit-item',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent,TabsModule],
    templateUrl: './add-edit-item.component.html',
    styleUrl: './add-edit-item.component.scss'
})
export class AddEditItemComponent extends BaseEditComponent implements OnInit {
    selectedGeoPoint: any;
    selectedTown: any;
    filteredTowns: any[] = [];
    filteredGeoPoints: any[] = [];
    touristMarinaId: string = '';
    showItemTabs: boolean = false;
    activeTab: ItemTabs = ItemTabs.General;
    itemsService: ItemsService = inject(ItemsService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditTouristMarina();
            this.touristMarinaId = this.activatedRoute.snapshot.paramMap.get('id') as string;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            name: ['', Validators.required],
            length: [0, Validators.required],
           url:['',Validators.required],
            northSide: ['', Validators.required],
            southSide: ['', Validators.required],        
            townId: ['', Validators.required],
            geoPointId: ['', Validators.required],
            note: ['']
        });
    }

    // getTowns(event: any) {
    //     const query = event.query.toLowerCase();
    //     this.townService.town.subscribe({
    //         next: (res:any) => {
    //             this.filteredTowns = res.filter((town: any) => town.nameAr.toLowerCase().includes(query) || town.nameEn.toLowerCase().includes(query));
    //         },
    //         error: (err) => {
    //             this.alert.error('خطأ فى جلب بيانات المدن');
    //         }
    //     });
    // }

    // getGeoPoints(event: any) {
    //     const query = event.query.toLowerCase();
    //     this.geoPointsService.geoPoints.subscribe({
    //         next: (res) => {
    //             this.filteredGeoPoints= res.filter((geoPoint: any) => (geoPoint.nameAr.toLowerCase().includes(query) || geoPoint.nameEn.toLowerCase().includes(query)) &&(geoPoint.code=="2"));
    //         },
    //         error: (err) => {
    //             this.alert.error('خطأ فى جلب الاحداث');
    //         }
    //     });
    // }

    onTownSelect(event: any) {
        this.selectedTown = event.value;
        this.form.get('townId')?.setValue(this.selectedTown.id);
    }

    onGeoPointSelect(event: any) {
        this.selectedGeoPoint = event.value;
        this.form.get('geoPointId')?.setValue(this.selectedGeoPoint.id);
    }

    get itemEnum() {
        return ItemTabs;
    }

    getEditTouristMarina = () => {
        this.itemsService.getEditItem(this.id).subscribe((touristMarina: any) => {
            console.log('touristMarina',touristMarina);
            this.initFormGroup();
            this.form.patchValue(touristMarina);
            // this.fetchTownDetails(touristMarina);
            // this.fetchGeoPointDetails(touristMarina);
        });
    };

    // fetchTownDetails(touristMarina: any) {
    //     this.townService.town.subscribe((response: any) => {
    //         this.filteredTowns = Array.isArray(response) ? response : response.data || [];
    //         this.selectedTown = this.filteredTowns.find((town: any) => town.id === touristMarina.townId);
    //         this.form.get('townId')?.setValue(this.selectedTown?.id);
    //     });
    // }

    // fetchGeoPointDetails(touristMarina: any) {
    //     this.itemsService.items.subscribe((response: any) => {
    //         this.filteredGeoPoints = Array.isArray(response) ? response : response.data || [];
    //         this.selectedGeoPoint = this.filteredGeoPoints.find((geoPoint: any) => geoPoint.id === touristMarina.geoPointId);
    //         this.form.get('geoPointId')?.setValue(this.selectedGeoPoint.id);
    //     });
    // }

    submit() {
        if (this.pageType === 'add') {
            this.itemsService.add(this.form.value).subscribe((res: any) => {
                this.touristMarinaId = res;
                this.showItemTabs = true;
                this.router.navigate(['/pages/tourist-marina/edit/', res]);
            });
        }
        if (this.pageType === 'edit') {
            this.itemsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/tourist-marina');
    };
}
