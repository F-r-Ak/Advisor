import { Injectable } from '@angular/core';
import { GetPagedBody, CityDto, AddCityDto, UpdateCityDto } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/cities/';
  }

  getCity(id: string) {
    return this.get<CityDto>({ apiName: `get/${id}` });
  }

  getEditCity(id: string) {
    return this.get<CityDto>({ apiName: `getEdit/${id}` });
  }

  get cities() {
    return this.get<CityDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddCityDto) {
    return this.post<AddCityDto, AddCityDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateCityDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
