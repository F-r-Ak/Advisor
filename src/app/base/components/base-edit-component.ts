import { OnInit, Directive, inject, DestroyRef, signal, WritableSignal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from './base-component';
import { Language } from '@ngx-translate/core';
import { Languages } from '../../core/enums/languages';

@Directive()
export abstract class BaseEditComponent extends BaseComponent implements OnInit {
    model = signal<any>({});
    form!: FormGroup;
    isEnglish = signal(false);
    language = signal<Language>(Languages.AR);
    id = signal<string>('');
    role = signal<any>({});
    fb = inject(FormBuilder);
    allowEdit: WritableSignal<boolean> = signal(false);

    override router = inject(Router);
    override destroyRef = inject(DestroyRef);
    constructor(protected activateRoute: ActivatedRoute) {
        super(activateRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.getRouteParams();
    }

    /**
     * تأثير بسيط لتحديث حالة اللغة الإنجليزية
     * لما تتغير قيمة اللغة
     */
    change = effect(() => {
        this.isEnglish.set(this.language() === Languages.EN);
    });

    /**
     * تفعيل أو تعطيل حقل بناءً على زر التبديل
     */
    toggleEditBtn(formControl: string) {
        const control = this.form.get(formControl);
        if (this.allowEdit()) {
            control?.enable({ emitEvent: false });
        } else {
            control?.disable({ emitEvent: false });
        }
    }

    protected getRouteParams() {
        const routId = this.activatedRoute.snapshot.paramMap.get('id');
        if (routId) {
            this.id.set(routId);
            this.pageType = 'edit';
        } else {
            this.pageType = 'add';
        }
    }

    /** Protected Methods */

    protected getUserRole(): void {
        //this.role = this.manager.GetRole();
    }

    redirect(url?: string) {
        this.router.navigate([url]);
    }

    preventDefault(event: any) {
        event.preventDefault();
    }
}
