import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/clients/clients.component').then((c) => c.ClientsComponent),
    data: { pageTitle: 'العملاء', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-clients/add-edit-clients.component').then((c) => c.AddEditClientsComponent),
    data: { pageTitle: 'اضافة عميل', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-clients/add-edit-clients.component').then((c) => c.AddEditClientsComponent),
    data: { pageTitle: 'تعديل بيانات عميل', pageType: 'edit' }
  }
];
