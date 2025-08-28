import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidationHandlerPipe } from '../../../pipes';

@Component({
    selector: 'app-prime-check-box',
    standalone: true,
    imports: [TranslateModule, CheckboxModule, FormsModule, ReactiveFormsModule, ValidationHandlerPipe],
    templateUrl: './p-check-box.component.html',
    styleUrl: './p-check-box.component.scss'
})
export class PrimeCheckBoxComponent implements OnInit {
    @Input() formGroup!: FormGroup;
    @Input() controlName = '';
    @Input() value = '';
    @Input() groupName = '';
    @Input() label = '';
    @Input() binary?: boolean;
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
