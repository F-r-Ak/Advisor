import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-submit-buttons',
    imports: [TranslateModule, ToolbarModule, RouterModule, CardModule],
    templateUrl: './submit-buttons.component.html',
    styleUrls: ['./submit-buttons.component.scss']
})
export class SubmitButtonsComponent {
    @Input() isSubmitDisabled: boolean = false;
    @Input() submitButtonText: string = 'ACTIONS.SUBMIT';
    @Input() hideSubmitButton: boolean = false;
    @Output() submit = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onSubmit() {
        this.submit.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}
