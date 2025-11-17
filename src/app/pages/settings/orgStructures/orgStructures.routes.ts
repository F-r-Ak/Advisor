import { Routes } from '@angular/router';

export const orgStructures: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/org-structures/org-structures.component').then((c) => c.OrgStructuresComponent),
    data: { pageTitle: 'الهياكل التنظيمية للمؤسسة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-org-structures/add-edit-org-structures.component').then((c) => c.AddEditOrgStructuresComponent),
    data: { pageTitle: 'اضافة هيكل تنظيمي مؤسسة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-org-structures/add-edit-org-structures.component').then((c) => c.AddEditOrgStructuresComponent),
    data: { pageTitle: 'تعديل هيكل تنظيمي مؤسسة', pageType: 'edit' }
  }
];
