import { Routes } from '@angular/router';

export const citiesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/cities/cities.component').then((c) => c.CitiesComponent),
        data: { pageTitle: 'مسميات المدن', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-cities/add-edit-cities.component').then((c) => c.AddEditCitiesComponent),
        data: { pageTitle: 'اضافة مدينة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-cities/add-edit-cities.component').then((c) => c.AddEditCitiesComponent),
        data: { pageTitle: 'تعديل مدينة', pageType: 'edit' }
    }
];
