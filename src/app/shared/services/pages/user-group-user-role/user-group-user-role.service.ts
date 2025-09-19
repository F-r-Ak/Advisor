import { Injectable } from '@angular/core';
import { GetPagedBody, UserGroupUserRoleDto, AddUserGroupUserRoleDto, UpdateUserGroupUserRoleDto } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class UserGroupUserRoleService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/usergroupuserrole/';
    }

    getUserGroupUserRole(id: string) {
        return this.get<UserGroupUserRoleDto>({ apiName: `Get/${id}` });
    }

    getEditUserGroupUserRole(id: string) {
        return this.get<UserGroupUserRoleDto>({ apiName: `getedit/${id}` });
    }

    get userGroupsUserRoles() {
        return this.get<UserGroupUserRoleDto[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: AddUserGroupUserRoleDto) {
        return this.post<AddUserGroupUserRoleDto, AddUserGroupUserRoleDto>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: UpdateUserGroupUserRoleDto) {
        return this.put({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string) {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }
}
