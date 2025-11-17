import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { GetPagedBody, ItemCategoryDto, AddItemCategoryDto, UpdateItemCategoryDto } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoriesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/itemcategory/';
  }

  getItemCategory(id: string): Observable<ItemCategoryDto> {
    return this.get<ItemCategoryDto>({ apiName: `get/${id}` });
  }

  getEditItemCategory(id: string): Observable<UpdateItemCategoryDto> {
    return this.get<UpdateItemCategoryDto>({ apiName: `getedit/${id}` });
  }

  get itemCategories() {
    return this.get<ItemCategoryDto[]>({ apiName: 'getall' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddItemCategoryDto) {
    return this.post<AddItemCategoryDto, AddItemCategoryDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateItemCategoryDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
