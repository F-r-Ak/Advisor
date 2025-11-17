import { Injectable } from '@angular/core';
import { Lookup, GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/countries/';
  }

  getCountry(id: string) {
    return this.get<Lookup>({ apiName: `get/${id}` });
  }

  getEditCountry(id: string) {
    return this.get<Lookup>({ apiName: `getEdit/${id}` });
  }

  get countries() {
    return this.get<Lookup[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: Lookup) {
    return this.post<Lookup, Lookup>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: Lookup) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
