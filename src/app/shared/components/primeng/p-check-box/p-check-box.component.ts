import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
    selector: 'app-prime-check-box',
    imports: [ CheckboxModule, FormsModule, ReactiveFormsModule],
    templateUrl: './p-check-box.component.html',
    styleUrl: './p-check-box.component.scss'
})
export class PrimeCheckBoxComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() value = '';
  @Input() groupName = '';
  @Input() label = '';
  @Input() binary!:boolean;

  constructor() {}

  ngOnInit(): void {
    console.log('checkbox: ', this.controlName);
  }
}
