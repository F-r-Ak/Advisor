import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

type Label = 'nameEn' | 'nameAr';
@Component({
  selector: 'app-prime-drop-down',
  imports: [Select, FormsModule, ReactiveFormsModule],
  templateUrl: './p-drop-down.component.html',
  styleUrl: './p-drop-down.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeDropDownComponent),
      multi: true
    }
  ]
})
export class PrimeDropDownComponent implements OnInit, ControlValueAccessor {
  @Input() optionLabel!: Label; // by default = nameEn or nameAr
  @Input() formGroup!: FormGroup;
  @Input() getMethod!: (body: any) => Observable<any[]>; // Function that accepts a body object
  @Input() formControlName!: string;
  @Input() optionValue!: string;
  @Input() isDisabled = false;
  @Input() language = 'ar';
  @Output() onChangeOption: EventEmitter<any> = new EventEmitter();

  selected!: string;
  options: any[] = [];
  currentPage = 0;
  pageSize = 6;
  totalCount = 0;
  totalPages = 1;
  filterValue = '';
  loading = false;
  protected filterData = new Subject<string>();
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  private onChange: any = () => {};
  constructor() {}

  ngOnInit(): void {
    this.filterData
      .pipe(
        debounceTime(500), // wait for 500ms pause in events
        switchMap(filter => {
          this.currentPage = 1; // Reset to the first page on new filter
          return this.loadDataList(this.currentPage, this.pageSize, filter); // Load categories based on filter
        })
      )
      .subscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(fn: any): void {
    // this.onWrite = fn;
  }

  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
  }

  get getBindLabel() {
    if (!this.optionLabel) {
      return this.language == 'ar' ? 'nameAr' : 'nameEn';
    }

    return this.optionLabel;
  }

  loadDataList(pageNumber: number, pageSize: number, filter: string): any {
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filter: { searchCriteria: filter },
      orderBy: [{ col: 'id', sort: 'asc' }]
    };
    if (this.getMethod) {
      this.loading = true;
      return this.getMethod(body).pipe(
        tap(res => {
          const data: any = res;
          if (this.currentPage === 1) {
            this.options = data.data;
          } else {
            this.options = [...this.options, ...data.data];
          }
          this.totalCount = data.totalCount;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);
          this.loading = false;
        }),
        catchError(err => {
          // this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
          return of([]); // Return an empty observable on error
        })
      );
    }
  }

  loadMoreData(event: any) {
    // debugger
    let pageNumber = event.first + 1;
    if (event.first == 0 && event.last > 0) {
      pageNumber = event.last / this.pageSize;
    }
    if ((pageNumber > this.currentPage && pageNumber <= this.totalPages) || this.filterValue) {
      this.currentPage = pageNumber;
      this.loadDataList(this.currentPage, this.pageSize, this.filterValue).subscribe();
    }
  }

  onChangeEvent(event: any) {
    const option = event.value;
    if (option) {
      this.onChange(option.id);
    }
    this.onChangeOption.emit(event);
  }

  onClear() {
    this.formGroup.get('formControlName')?.reset();
  }
}
