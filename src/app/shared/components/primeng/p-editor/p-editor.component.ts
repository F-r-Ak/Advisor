import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationHandlerPipe } from '../../../pipes';
import { EditorModule } from 'primeng/editor';
@Component({
    selector: 'app-prime-editor',
    imports: [TranslateModule, EditorModule, ReactiveFormsModule, FormsModule, ValidationHandlerPipe],
    templateUrl: './p-editor.component.html',
    styleUrl: './p-editor.component.scss'
})
export class PrimeEditorComponent implements OnInit{
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() readonly = false;
  @Input() label: any = '';

  ngOnInit(): void {
    console.log("formGroup: ", this.formGroup, "formControlName: ",this.controlName);
  }
}
