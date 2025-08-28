import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ValidationHandlerPipe } from '../../../pipes';

@Component({
    selector: 'app-prime-radio-button',
    standalone: true,
    imports: [TranslateModule, RadioButtonModule, ReactiveFormsModule, FormsModule, ValidationHandlerPipe],
    templateUrl: './p-radio-button.component.html',
    styleUrl: './p-radio-button.component.scss'
})
export class PrimeRadioButtonComponent implements OnInit {
    @Input() formGroup!: FormGroup;
    @Input() controlName = '';
    @Input() value = '';
    @Input() groupName = '';
    @Input() label = '';
    @Input() binary!: boolean;
    @Input() disabled: boolean = false;
    @Output() onChangeOption: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        if (this.disabled && this.formGroup && this.controlName) {
            this.formGroup.get(this.controlName)?.disable();
        } else if (!this.disabled && this.formGroup && this.controlName) {
            this.formGroup.get(this.controlName)?.enable();
        }
    }

    onChange(event: any) {
        this.onChangeOption.emit(event);
    }
}
