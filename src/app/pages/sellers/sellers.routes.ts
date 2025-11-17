import { Routes } from '@angular/router';

export const sellersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/sellers/sellers.component').then((c) => c.ClientsComponent),
    data: { pageTitle: 'الموردين', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-sellers/add-edit-sellers.component').then((c) => c.AddEditSellersComponent),
    data: { pageTitle: 'اضافة مورد', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-sellers/add-edit-sellers.component').then((c) => c.AddEditSellersComponent),
    data: { pageTitle: 'تعديل بيانات مورد', pageType: 'edit' }
  }
];
