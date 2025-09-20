import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrgStructureJobTitlesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/orgstructurejobtitles/';
    }

    getOrgStructureJobTitle(id: string): Observable<any> {
        return this.get<any>({ apiName: `get/${id}` });
    }

    getEditOrgStructureJobTitle(id: string): Observable<any> {
        return this.get<any>({ apiName: `getedit/${id}` });
    }

    get OrgStructureJobTitles() {
        return this.get<any[]>({ apiName: 'getall' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: any) {
        return this.post<any, any>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: any) {
        return this.put({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string) {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }
}
