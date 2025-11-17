import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
      },
      {
        label: '',
        items: [
          {
            label: 'الاعدادات',
            icon: 'pi pi-fw pi-spin pi-cog',
            // routerLink: ['/pages'],
            items: [
              {
                label: 'المسميات الوظيفية',
                icon: 'pi pi-briefcase',
                routerLink: ['/pages/settings/positions']
              },
              {
                label: 'تسعير العناصر',
                icon: 'pi pi-tag',
                routerLink: ['/pages/settings/item-pricing']
              },
              {
                label: 'الوحدات ',
                icon: 'pi pi-box',
                routerLink: ['/pages/settings/units']
              },
              {
                label: 'الشركة المصنعة ',
                icon: 'pi pi-building',
                routerLink: ['/pages/settings/vendor']
              },

              {
                label: 'مسميات الفروع',
                icon: 'pi pi-sitemap',
                routerLink: ['/pages/settings/branchs']
              },
              {
                label: 'مسميات المناطق',
                icon: 'pi pi-warehouse',
                routerLink: ['/pages/settings/regions']
              },
              {
                label: 'الخزن',
                icon: 'pi pi-server',
                routerLink: ['/pages/settings/treasury']
              },
              {
                label: 'تصنيفات العملاء',
                icon: 'pi pi-cart-minus',
                routerLink: ['/pages/settings/client-category']
              },
              {
                label: 'تصنيفات الموردين',
                icon: 'pi pi-cart-arrow-down',
                routerLink: ['/pages/settings/seller-category']
              },
              {
                label: ' المستخدم',
                icon: 'pi pi-user',
                routerLink: ['/pages/settings/user']
              },
              {
                label: 'صلاحيات المستخدم',
                icon: 'pi pi-shield',
                routerLink: ['/pages/settings/user-role']
              },
              {
                label: ' الموظف',
                icon: 'pi pi-user',
                routerLink: ['/pages/settings/employee']
              },
              {
                label: 'الادوار',
                icon: 'pi pi-users',
                routerLink: ['/pages/settings/user-groups']
              },
              {
                label: 'المسميات الوظيفية',
                icon: 'pi pi-users',
                routerLink: ['/pages/settings/job-titles']
              },
              {
                label: 'تصنيفات المنتج',
                icon: 'pi pi-box',
                routerLink: ['/pages/settings/item-categories']
              },
              {
                label: 'مسميات الدول',
                icon: 'pi pi-box',
                routerLink: ['/pages/settings/countries']
              },
              {
                label: 'تصنيفات المدن',
                icon: 'pi pi-box',
                routerLink: ['/pages/settings/cities']
              },
              {
                label: 'مسميات الهياكل التنظيمية',
                icon: 'pi pi-building',
                routerLink: ['/pages/settings/org-structures']
              }
            ]
          }
        ]
      },
      {
        label: 'الشاشات',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'الاصناف',
            icon: 'pi pi-tags',
            routerLink: ['/pages/items']
          },
          {
            label: 'العملاء',
            icon: 'pi pi-user',
            routerLink: ['/pages/clients']
          },
          {
            label: 'الموردين',
            icon: 'pi pi-user',
            routerLink: ['/pages/sellers']
          },
          {
            label: 'الشيفتات',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/shifts']
          },
          {
            label: 'ادوار المستخدمين',
            icon: 'pi pi-briefcase',
            routerLink: ['/pages/user-user-group']
          },
          {
            label: 'صلاحيات الادوار',
            icon: 'pi pi-user',
            routerLink: ['/pages/user-groups-user-roles']
          },
          {
            label: 'فروع المستخدمين',
            icon: 'pi pi-user',
            routerLink: ['/pages/user-branchs']
          },
          {
            label: 'org-structure-job-titles',
            icon: 'pi pi-building',
            routerLink: ['/pages/org-structure-job-titles']
          },
          {
            label: 'الأقسام',
            icon: 'pi pi-building',
            routerLink: ['/pages/departments']
          }
        ]
      }
    ];
  }
}
