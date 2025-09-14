import { Injectable } from '@angular/core';
import { GetPagedBody, AddItemItemUnitDto, ItemItemUnitDto, UpdateItemItemUnitDto } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class ItemItemUnitsService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/itemitemunit//';
    }

    getItemItemUnit(id: string) {
        return this.get<ItemItemUnitDto>({ apiName: `Get/${id}` });
    }

    getEditItemItemUnit(id: string) {
        return this.get<ItemItemUnitDto>({ apiName: `getedit/${id}` });
    }

    get itemItemUnits() {
        return this.get<ItemItemUnitDto[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: AddItemItemUnitDto) {
        return this.post<AddItemItemUnitDto, ItemItemUnitDto>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: UpdateItemItemUnitDto) {
        return this.put({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string) {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }
}
