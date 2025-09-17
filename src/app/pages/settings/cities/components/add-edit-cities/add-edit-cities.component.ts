import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitiesService, CountriesService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Lookup } from '../../../../../shared/interfaces';

@Component({
    selector: 'app-add-edit-cities',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-cities.component.html',
    styleUrl: './add-edit-cities.component.scss'
})
export class AddEditCitiesComponent extends BaseEditComponent implements OnInit {
    selectedCountry!: Lookup;
    filteredCountries: Lookup[] = [];

    citiesService: CitiesService = inject(CitiesService);
    countriesService: CountriesService = inject(CountriesService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditCity();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: [''],
            countryId: ['', Validators.required]
        });
    }

    getCountries(event: any) {
        const query = event.query.toLowerCase();
        this.countriesService.countries.subscribe({
            next: (res: any) => {
                this.filteredCountries = res.filter((country: any) => country.nameAr.toLowerCase().includes(query) || country.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الدول');
            }
        });
    }

    onCountrySelect(event: any) {
        this.selectedCountry = event.value;
        this.form.get('countryId')?.setValue(this.selectedCountry.id);
    }

    getEditCity = () => {
        this.citiesService.getEditCity(this.id).subscribe((city: any) => {
            this.initFormGroup();
            this.form.patchValue(city);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.citiesService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.citiesService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
