import { Routes } from '@angular/router';

export const positionsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/positions/positions.component').then((c) => c.PositionsComponent),
        data: { pageTitle: 'المسميات الوظيفية', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-position/add-edit-position.component').then((c) => c.AddEditPositionComponent),
        data: { pageTitle: 'اضافة مسمى وظيفي', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-position/add-edit-position.component').then((c) => c.AddEditPositionComponent),
        data: { pageTitle: 'تعديل مسمى وظيفي', pageType: 'edit' }
    }
];
