import { Routes } from '@angular/router';

export const branchsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/branchs/branchs.component').then((c) => c.BranchsComponent),
    data: { pageTitle: 'مسميات الفروع', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-branchs/add-edit-branchs.component').then((c) => c.AddEditBranchsComponent),
    data: { pageTitle: 'اضافة مسمي الفرع', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-branchs/add-edit-branchs.component').then((c) => c.AddEditBranchsComponent),
    data: { pageTitle: 'تعديل مسمي الفرع', pageType: 'edit' }
  }
];
