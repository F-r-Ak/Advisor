import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-prime-delete-dialog',
  imports: [ DialogModule],
  templateUrl: './p-delete-dialog.component.html',
  styleUrl: './p-delete-dialog.component.scss'
})
export class PrimeDeleteDialogComponent implements OnInit {
  deleteMainDialog: boolean = false;
  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  splitedId: string='';
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private _location: Location, private router: Router) {}

  ngOnInit(): void {
    this.deleteMainDialog = true;
    console.log('delete dialog opened: ', this.router.url.split('/')[this.router.url.split('/').length - 1]);

    if (this.router.url.split('/')[this.router.url.split('/').length - 1]) {
      this.splitedId = this.router.url.split('/')[this.router.url.split('/').length - 1];
    }
  }

  closeDeleteConfirmationDialog() {
    this.deleteMainDialog = false;

    // this._location.back();
    this.onClose.emit(false);
  }

  confirmDelete() {
    console.log('confirm deleted: ');
    this.deleteMainDialog = false;
    this.onClose.emit(true);
    // this._location.back();
  }
}
