import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { Lookup, GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VendorService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/itemvendor/';
    }

    getVendor(id: string) {
        return this.get<Lookup>({ apiName: `get/${id}` });
    }

    getEditVendor(id: string) {
        return this.get<Lookup>({ apiName: `getedit/${id}` });
    }

    getAllVendors() {
        return this.get<Lookup[]>({ apiName: 'getall' });
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
