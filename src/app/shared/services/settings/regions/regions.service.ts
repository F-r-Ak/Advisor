import { Injectable } from '@angular/core';
import { Lookup, GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';
import { RegionDto, AddRegionDto, UpdateRegionDto } from '../../../interfaces/regions/regions';

@Injectable({
  providedIn: 'root'
})
export class RegionsService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/regions/';
  }

  getRegions(id: string) {
    return this.get<RegionDto>({ apiName: `get/${id}` });
  }

  getEditRegions(id: string) {
    return this.get<RegionDto>({ apiName: `getEdit/${id}` });
  }

  get regions() {
    return this.get<RegionDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddRegionDto) {
    return this.post<AddRegionDto, AddRegionDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateRegionDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
