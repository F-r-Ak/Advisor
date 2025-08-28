import { OnInit, Directive, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from './base-component';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseEditComponent extends BaseComponent implements OnInit {
    model: any = {};
    form!: FormGroup;
    isEnglish = false;
    language: string = 'ar';
    id: string = '';
    role: any = {};
    fb = inject(FormBuilder);
    router = inject(Router);
    protected destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(protected activateRoute: ActivatedRoute) {
        super(activateRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.getRouteParams();
    }

    protected getRouteParams() {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
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
        this.route.navigate([url]);
    }

    preventDefault(event: any) {
        event.preventDefault();
    }
}
