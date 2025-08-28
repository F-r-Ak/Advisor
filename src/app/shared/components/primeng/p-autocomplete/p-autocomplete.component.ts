import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../services';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { ValidationHandlerPipe } from '../../../pipes/validation-handler.pipe';

@Component({
    selector: 'app-prime-autocomplete',
    imports: [TranslateModule, AutoCompleteModule, FormsModule, ReactiveFormsModule, ValidationHandlerPipe],
    templateUrl: './p-autocomplete.component.html',
    styleUrl: './p-autocomplete.component.scss'
})
export class PrimeAutoCompleteComponent {
    @Input() formGroup!: FormGroup;
    @Input() selectedOption!: any | any[];
    @Input() suggestions: any[] = [];
    @Input() dropdown: boolean = true;
    @Input() showClear: boolean = true;
    @Input() forceSelection: boolean = true;
    @Input() field!: any;
    @Input() language: string = 'ar';
    @Input() lazy: boolean = true;
    @Input() virtualScroll: boolean = true;
    @Input() multiple: boolean = false;
    @Input() disabled: boolean = false;
    @Input() optionDisabled?: string;
    @Input() controlName!: string;
    @Input() getMethod!: (body: any) => Observable<any[]>;
    @Output() onSelect: EventEmitter<any | any[]> = new EventEmitter();
    @Output() onClear: EventEmitter<any | any[]> = new EventEmitter();
    @Output() handleMethod: EventEmitter<any> = new EventEmitter();

    isLoading: boolean = false;
    pageNumber: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    isFirstLoad: boolean = true;
    query: string = '';
    searchSubject = new Subject<string>();
    localize = inject(TranslationService);

    ngOnInit(): void {
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((query) => {
            this.query = query;
            this.loadData();
        });
    }

    get getBindLabel() {
        if (!this.field) {
            return this.language == 'ar' ? 'nameAr' : 'nameEn';
        }
        return this.field;
    }

    handleCompleteMethod(event: any) {
        if (this.lazy) {
            this.query = event.query;
            this.pageNumber = 1;
            this.loadData();
        }
        this.handleMethod.emit(event);
    }

    handleSelect(event: any) {
        this.onSelect.emit(this.multiple ? this.selectedOption : event);
    }

    handleClear() {
        this.onClear.emit(this.multiple ? [] : null);
    }

    onLazyLoad(event: any) {
        const currentLoaded = event.first + event.last;
        if (currentLoaded >= this.suggestions.length && this.suggestions.length < this.totalCount && !this.isFirstLoad) {
            this.loadData();
        }
    }

    loadData() {
        if (this.isLoading) return;

        this.isLoading = true;
        const body = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: { searchCriteria: this.query },
            orderByValue: [{ col: 'id', sort: 'asc' }]
        };
        if (this.getMethod) {
            this.getMethod(body).subscribe((response: any) => {
                this.totalCount = response.totalCount;
                if (this.pageNumber === 1) {
                    this.suggestions = response.data;
                } else {
                    this.suggestions = [...this.suggestions, ...response.data];
                }
                if (this.selectedOption && this.suggestions.length > 0) {
                    const selectedOptionId = this.selectedOption.id;
                    const selectedIndex = this.suggestions.findIndex((item) => item.id === selectedOptionId);
                    if (selectedIndex > -1 && selectedIndex !== 0) {
                        const [selectedItem] = this.suggestions.splice(selectedIndex, 1);
                        this.suggestions.unshift(selectedItem);
                    } else if (selectedIndex === -1 && this.pageNumber === 1) {
                        this.suggestions.unshift(this.selectedOption);
                    }
                }

                if (this.suggestions.length < this.totalCount) {
                    this.pageNumber++;
                }
                this.isLoading = false;
                this.isFirstLoad = false;
            });
        }
    }
}
