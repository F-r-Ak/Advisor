import { Routes } from '@angular/router';

export const shiftsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/shift/shift.component').then((c) => c.ShiftsComponent),
        data: { pageTitle: 'العملاء', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-shift/add-edit-shift.component').then((c) => c.AddEditShiftComponent),
        data: { pageTitle: 'اضافة شيفت', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-shift/add-edit-shift.component').then((c) => c.AddEditShiftComponent),
        data: { pageTitle: 'تعديل شيفت', pageType: 'edit' }
    }
];
