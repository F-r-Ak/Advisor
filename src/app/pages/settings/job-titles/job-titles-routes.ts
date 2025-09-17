import { Routes } from '@angular/router';

export const jobTitlesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/job-titles/job-titles.component').then((c) => c.JobTitlesComponent),
        data: { pageTitle: ' المسميات الوظيفية', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-job-titles/add-edit-job-titles.component').then((c) => c.AddEditJobTitlesComponent),
        data: { pageTitle: 'اضافة مسمى وظيفى', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-job-titles/add-edit-job-titles.component').then((c) => c.AddEditJobTitlesComponent),
        data: { pageTitle: 'تعديل مسمى وظيفى', pageType: 'edit' }
    }
];
