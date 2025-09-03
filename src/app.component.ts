import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, NgxSpinnerModule],
    template: `<router-outlet></router-outlet>
        <!--  -->
        <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#36c773" type="square-jelly-box" [fullScreen]="true">
            <p style="color: white">... Loading, please wait</p>
        </ngx-spinner> `
})
export class AppComponent {}
