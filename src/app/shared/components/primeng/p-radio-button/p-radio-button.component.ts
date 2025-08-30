import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-prime-radio-button',
  imports: [ RadioButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './p-radio-button.component.html',
  styleUrl: './p-radio-button.component.scss'
})
export class PrimeRadioButtonComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() value = '';
  @Input() groupName = '';
  @Input() label: any = '';
  @Input() disabled = false;
  @Input() binary: boolean =true;

  constructor() {}

  ngOnInit(): void {}
}
