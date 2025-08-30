import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatDate, NgClass } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
@Component({
    selector: 'app-prime-calendar',
    imports: [CalendarModule, FormsModule, ReactiveFormsModule, NgClass],
    templateUrl: './p-calendar.component.html',
    styleUrl: './p-calendar.component.scss'
})
export class PrimeCalendarComponent implements OnInit {
  @Input() formGroup: FormGroup | any;
  @Input() controlName = '';

  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() timeOnly = false;
  @Input() label = 'Date';
  format: string='';
  placeHolderValue: string='';

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    // console.log('date format: ', this.formGroup.get(this.controlName).value);

    if (this.timeOnly) {
      this.format = 'hh:mm aa';
    } else {
      this.format = 'dd/MM/yyyy hh:mm aa';
    }

    if (this.formGroup.get(this.controlName).value) {
      // this.formGroup.controls[this.controlName].setValue(
      //   formatDate(
      //     this.formGroup.get(this.controlName).value,
      //     this.format,
      //     this.locale
      //   )
      // );

      this.placeHolderValue = formatDate(this.formGroup.get(this.controlName).value, this.format, this.locale);

      console.log('date format after: ', this.formGroup.get(this.controlName).value);
    }
  }
}
