import { Injectable } from '@angular/core';
import { GetPagedBody, AddItemDto, ItemDto, UpdateItemDto } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class UserUserGroupService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/userusergroup/';
    }

    getUserUsergroup(id: string) {
        return this.get<ItemDto>({ apiName: `Get/${id}` });
    }

    getEditUserUsergroup(id: string) {
        return this.get<ItemDto>({ apiName: `getedit/${id}` });
    }

    get UserUserGroups() {
        return this.get<ItemDto[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: AddItemDto) {
        return this.post<AddItemDto, ItemDto>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: UpdateItemDto) {
        return this.put({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string) {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }
}
