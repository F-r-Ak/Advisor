import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/employee/employee.component').then((c) => c.EmployeeComponent),
    data: { pageTitle: ' الموظفين', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-employee/add-edit-employee.component').then((c) => c.AddEditEmployeeComponent),
    data: { pageTitle: 'اضافة موظف جديد', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-employee/add-edit-employee.component').then((c) => c.AddEditEmployeeComponent),
    data: { pageTitle: 'تعديل موظف', pageType: 'edit' }
  }
];
