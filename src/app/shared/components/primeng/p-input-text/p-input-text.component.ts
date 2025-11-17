import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SpecificLanguageDirective } from '../../../directives';
import { ValidationHandlerPipe } from '../../../pipes';
@Component({
  selector: 'app-prime-input-text',
  imports: [TranslateModule, NgClass, FormsModule, ReactiveFormsModule, InputTextModule, ValidationHandlerPipe, SpecificLanguageDirective],
  templateUrl: './p-input-text.component.html',
  styleUrl: './p-input-text.component.scss'
})
export class PrimeInputTextComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() validatorLanguageType = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() appearance = 'outline';
  @Input() readonly = false;
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
