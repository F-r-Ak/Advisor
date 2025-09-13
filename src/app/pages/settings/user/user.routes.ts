import { Routes } from '@angular/router';

export const userRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user/user.component').then((c) => c.UserComponent),
        data: { pageTitle: ' المستخدم', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-user/add-edit-user.component').then((c) => c.AddEditUserComponent),
        data: { pageTitle: 'اضافة مستخدم جديد', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-user/add-edit-user.component').then((c) => c.AddEditUserComponent),
        data: { pageTitle: 'تعديل مستخدم', pageType: 'edit' }
    }
];
