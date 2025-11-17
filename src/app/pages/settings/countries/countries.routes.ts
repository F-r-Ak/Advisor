import { Routes } from '@angular/router';

export const countriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/countries/countries.component').then((c) => c.CountriesComponent),
    data: { pageTitle: 'مسميات الدول', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-countries/add-edit-countries.component').then((c) => c.AddEditCountriesComponent),
    data: { pageTitle: 'اضافة دولة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-countries/add-edit-countries.component').then((c) => c.AddEditCountriesComponent),
    data: { pageTitle: 'تعديل دولة', pageType: 'edit' }
  }
];
