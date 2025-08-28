import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-prime-title-toolbar',
  imports: [ToolbarModule, RouterModule, CardModule],
  templateUrl: './p-title-toolbar.component.html',
  styleUrls: ['./p-title-toolbar.component.scss']
})
export class PrimeTitleToolBarComponent {
  @Input() pageTitle: string ='';
  constructor() {}

  ngOnInit(): void {}
}
