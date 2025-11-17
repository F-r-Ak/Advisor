import { Routes } from '@angular/router';

export const orgStructureJobTitlesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/org-structure-job-titles/org-structure-job-titles.component').then((c) => c.OrgStructureJobTitlesComponent),
    data: { pageTitle: 'orgStructureJobTitles', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-org-structure-job-title/add-edit-org-structure-job-title.component').then((c) => c.AddEditOrgStructureJobTitleComponent),
    data: { pageTitle: 'اضافة تصنيف', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-org-structure-job-title/add-edit-org-structure-job-title.component').then((c) => c.AddEditOrgStructureJobTitleComponent),
    data: { pageTitle: 'تعديل تصنيف', pageType: 'edit' }
  }
];
