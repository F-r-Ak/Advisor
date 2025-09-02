import { Routes } from '@angular/router';

export const unitsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/units/units.component').then((c) => c.UnitsComponent),
        data: { pageTitle: 'مسميات الوحدات', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-unit/add-edit-unit.component').then((c) => c.AddEditUnitComponent),
        data: { pageTitle: 'اضافة وحدة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-unit/add-edit-unit.component').then((c) => c.AddEditUnitComponent),
        data: { pageTitle: 'تعديل وحدة', pageType: 'edit' }
    }
];
