import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-image-viewer',
    imports: [DialogModule],
    providers: [DialogService],
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  data: any;
  dialogService = inject(DialogService);
  dialogConfig = inject(DynamicDialogConfig);
  constructor() {}

  ngOnInit(): void {
    this.data = this.dialogConfig.data;
  }

  close() {
  }
}
