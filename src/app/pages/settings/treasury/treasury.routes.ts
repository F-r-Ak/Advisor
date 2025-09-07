import { Routes } from '@angular/router';

export const treasuryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/treasury/treasury.component').then((c) => c.TreasuryComponent),
        data: { pageTitle: 'تصنيفات الخزن', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-treasury/add-edit-treasury.component').then((c) => c.AddEditTreasuryComponent),
        data: { pageTitle: 'اضافة خزنة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-treasury/add-edit-treasury.component').then((c) => c.AddEditTreasuryComponent),
        data: { pageTitle: 'تعديل خزنة', pageType: 'edit' }
    }
];
