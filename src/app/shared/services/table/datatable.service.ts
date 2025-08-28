import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableOptions } from '../../interfaces';
import { ConfigService } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  opt: TableOptions['bodyOptions'] = {
    pageNumber: 1,
    pageSize: 5,
    orderByValue: [{ colId: 'id', sort: 'asc' }],
    filter: {}
  };
  hostApi: string;
  public searchNew$: BehaviorSubject<{}> = new BehaviorSubject({});
  configService = inject(ConfigService);
  constructor(private http: HttpClient) {
    this.hostApi = this.configService.getAppUrl('HOST_API');
  }

  loadData(url?: string): Observable<any> {
    return this.http.post(this.hostApi + url, this.opt);
  }

  delete(url?: any, id?: string, appId?: any): Observable<any> {
    if (appId) {
      return this.http.delete(this.hostApi + url + '/' + id + '/' + appId);
    }
    return this.http.delete(this.hostApi + url + '/' + id);
  }

  deleteRange(url: string, body: string[]) {
    return this.http.delete<any>(`${this.hostApi + url}`, { body: body });
  }
}
