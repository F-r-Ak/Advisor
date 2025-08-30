import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
@Component({
    selector: 'app-prime-editor',
    imports: [ EditorModule, ReactiveFormsModule, FormsModule],
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
