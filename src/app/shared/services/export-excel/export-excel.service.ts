import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(private _fileSaverService: FileSaverService) { }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "exported-data");

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    this._fileSaverService.save(data, fileName + EXCEL_EXTENSION);
  }
}
