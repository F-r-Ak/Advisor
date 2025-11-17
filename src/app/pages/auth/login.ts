import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
// import { PagesEnums } from 'src/app/api/enums/pages.enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../pages/core/service/alert/alert.service';
// import { Shell } from 'src/app/demo/pages/base/components/shell';
// import { Helper } from 'src/app/api/helpers/helper';

import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
  template: `
    <!-- <app-floating-configurator /> -->
    <div class="bg-surface-50  flex items-center justify-center min-h-screen min-w-[50vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div style="background-color:#259BAA;border-radius: 20px">
          <div class="w-full bg-surface-0 dark:bg-surface-900 " style=" background-color:#D9D9D9 ;border-radius: 20px">
            <div class="text-center mb-8">
              <div class="text-surface-900   text-3xl font-medium mb-4 py-3 " style="background-color:#0D0A52; color:#EEEE; border-top-left-radius: 10px;border-top-right-radius: 20px">تسجيل الدخول</div>
            </div>

            <div dir="rtl" class="p-6 ">
              <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2  ">البريد الالكترونى</label>
              <input pInputText id="email1" type="text" placeholder="Email address" class="w-75 md:w-[30rem] mb-8" [(ngModel)]="email" />

              <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">الرقم السرى</label>
              <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <!-- <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="ml-2"></p-checkbox>
                                    <label for="rememberme1">تذكرنى</label>
                                </div> -->
                <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">هل نسيت كلمة السر ؟</span> -->
              </div>
              <div class="flex items-center justify-center">
                <p-button label="دخول" styleClass="p-login-button" routerLink="/"></p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  loginForm!: FormGroup;

  // get alert(): AlertService {
  //     return Shell.Injector.get(AlertService);
  //   }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.email]), // Validators.pattern()
      Password: new FormControl('', [Validators.required])
    });
  }

  checkUserPermission(role: any) {
    // return Helper.hasAccessRole(role);
  }
  // handleSubmitByJWT() {

  //     if (this.loginForm.valid) {
  //         console.log('his.loginForm.valid: ', this.loginForm.valid);

  //         this.auth.apiUserLoginPost$Json({body:this.loginForm.value}).subscribe({
  //             next: (res) => {
  //                 localStorage.removeItem('accessToken');
  //                 // console.log(res.token)
  //                 // localStorage.setItem('accessToken', res.token);
  //                 // localStorage.setItem('name', res.name);
  //                 // localStorage.setItem('organizationName', res.organizationName);

  //                 // this.alert.success("تم تسجيل الدخول بنجاح")

  //                 // if(this.checkUserPermission(PagesEnums.ADMIN)||this.checkUserPermission(PagesEnums.SUPER)){
  //                 //   this.router.navigate(['/apexchart']);
  //                 // }
  //                 // else if(this.checkUserPermission(PagesEnums.ORG)){

  //                 //   this.router.navigate(['/pages/my-organization']);
  //                 // }

  //             },
  //             error: (err) => {
  //                 console.log("post err: ", err)
  //                 if(err){
  //                     // this.alert.error("خطا في تسجيل البيانات لا يمكنك الدخول")

  //                 }

  //             },
  //         });
  //       }
  // }
}
