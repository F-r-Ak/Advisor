import { Routes } from '@angular/router';

export const departmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/departments/departments.component').then((c) => c.DepartmentsComponent),
    data: { pageTitle: 'الأقسام', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-department/add-edit-department.component').then((c) => c.AddEditDepartmentComponent),
    data: { pageTitle: 'اضافة قسم', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-department/add-edit-department.component').then((c) => c.AddEditDepartmentComponent),
    data: { pageTitle: 'تعديل قسنم', pageType: 'edit' }
  }
];
