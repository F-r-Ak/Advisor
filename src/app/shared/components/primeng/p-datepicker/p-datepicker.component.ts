import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationHandlerPipe } from '../../../pipes';
import { NgClass } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-prime-datepicker',
  standalone: true,
  imports: [
    TranslateModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    ValidationHandlerPipe,
  ],
  templateUrl: './p-datepicker.component.html',
  styleUrl: './p-datepicker.component.scss'
})
export class PrimeDatepickerComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Input() mode: 'date' | 'time' | 'datetime' = 'date';
  @Input() referenceControlName = '';
  @Input() label = 'Date';
  @Input() utcMode: boolean = true;
  @Input() showIcon: boolean = true;
  @Input() showButtonBar: boolean = true;

  @Input() set disabled(value: boolean) {
    if (this.formGroup && this.controlName) {
      const control = this.formGroup.get(this.controlName);
      if (control) {
        if (value) {
          control.disable();
        } else {
          control.enable();
        }
      }
    }
  }

  currentValue: Date | null = null;
  dateFormat: string = '';
  showTimePicker: boolean = false;
  timeOnlyMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.configurePickerMode();
    this.setCurrentValue();
    this.setupValidation();
    this.setupValueChanges();
  }

  private configurePickerMode(): void {
    switch (this.mode) {
      case 'time':
        this.dateFormat = 'HH:mm';
        this.showTimePicker = true;
        this.timeOnlyMode = true;
        break;
      case 'datetime':
        this.dateFormat = 'dd/mm/yy HH:mm';
        this.showTimePicker = true;
        this.timeOnlyMode = false;
        break;
      case 'date':
      default:
        this.dateFormat = 'dd/mm/yy';
        this.showTimePicker = false;
        this.timeOnlyMode = false;
        break;
    }
  }

  private setCurrentValue(): void {
    if (this.formGroup?.get(this.controlName)?.value) {
      const value = this.formGroup.get(this.controlName)?.value;
      this.currentValue = this.parseInputDate(value);
    } else {
      this.currentValue = null;
    }
  }

  private parseInputDate(value: string | Date): Date {
    if (!value) return new Date();

    if (typeof value === 'string') {
      if (this.mode === 'time') {
        const [hours, minutes, seconds] = value.split(':').map(Number);
        const dummyDate = new Date(2000, 0, 1, hours || 0, minutes || 0, seconds || 0);
        return dummyDate;
      } else if (value.includes('T')) {
        const date = new Date(value);
        return this.utcMode ? this.convertToUTCDate(date) : date;
      } else {
        const parts = value.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts.map(Number);
            return this.utcMode
            ? new Date(Date.UTC(year, month - 1, day))
            : new Date(year, month - 1, day);
        }
        return new Date(value);
      }
    }
    return this.utcMode ? this.convertToUTCDate(value) : value;
  }

  private convertToUTCDate(date: Date): Date {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ));
  }

  private setupValueChanges(): void {
    this.formGroup?.get(this.controlName)?.valueChanges.subscribe(val => {
      if (val && this.utcMode && (this.mode === 'date' || this.mode === 'datetime')) {
        this.handleTimezoneConversion();
      }
    });
  }

  private handleTimezoneConversion(): void {
    const control = this.formGroup.get(this.controlName);
    if (!control?.value) return;

    const dateValue = this.parseInputDate(control.value);
    if (this.mode === 'date') {
      const utcDate = new Date(Date.UTC(
        dateValue.getFullYear(),
        dateValue.getMonth(),
        dateValue.getDate()
      ));
      if (control.value?.getTime() !== utcDate.getTime()) {
        control.setValue(utcDate, { emitEvent: false });
        this.currentValue = utcDate;
      }
    } else if (this.mode === 'datetime' && this.utcMode) {
      const utcDate = this.convertToUTCDate(dateValue);
      if (control.value?.getTime() !== utcDate.getTime()) {
        control.setValue(utcDate, { emitEvent: false });
        this.currentValue = utcDate;
      }
    }
  }

  private setupValidation(): void {
    if (this.formGroup && this.controlName && this.referenceControlName) {
      const control = this.formGroup.get(this.controlName);
      const referenceControl = this.formGroup.get(this.referenceControlName);

      if (control && referenceControl) {
        control.valueChanges.subscribe(() => {
          control.updateValueAndValidity({ emitEvent: false });
          referenceControl.updateValueAndValidity({ emitEvent: false });
        });

        referenceControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity({ emitEvent: false });
          referenceControl.updateValueAndValidity({ emitEvent: false });
        });
      }
    }
  }

  onDateSelect(event: any): void {
    if (event) {
      const selectedDate = event as Date;
      if (this.utcMode && (this.mode === 'date' || this.mode === 'datetime')) {
        const utcDate = this.convertToUTCDate(selectedDate);
        if (this.mode === 'date') {
          const dateOnly = new Date(Date.UTC(
            utcDate.getFullYear(),
            utcDate.getMonth(),
            utcDate.getDate()
          ));
          this.formGroup.get(this.controlName)?.setValue(dateOnly);
          this.currentValue = dateOnly;
        } else {
          this.formGroup.get(this.controlName)?.setValue(utcDate);
          this.currentValue = utcDate;
        }
      } else {
        this.formGroup.get(this.controlName)?.setValue(selectedDate);
        this.currentValue = selectedDate;
      }
    }
  }
}
