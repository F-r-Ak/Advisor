import { Injectable } from '@angular/core';
import { Lookup, GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class UserService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/user/';
    }

    getUser(id: string) {
        return this.get<Lookup>({ apiName: `get/${id}` });
    }

    getEditUser(id: string) {
        return this.get<Lookup>({ apiName: `getedit/${id}` });
    }

    get Users() {
        return this.get<Lookup[]>({ apiName: 'getall' });
    }

    getPaged(body: GetPagedBody<any>): Observable<any> {
        return this.post<any, any>({ apiName: `getpaged`, showAlert: true }, body);
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
