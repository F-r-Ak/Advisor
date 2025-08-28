import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { Lookup, GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PositionsService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/position/';
    }

    getPosition(id: string) {
        return this.get<Lookup>({ apiName: `Get/${id}` });
    }

    getEditPosition(id: string) {
        return this.get<Lookup>({ apiName: `getEdit/${id}` });
    }

    get positions() {
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
