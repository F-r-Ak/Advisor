import { Injectable } from '@angular/core';
import { AddSellerDto, GetPagedBody, SellerDto, UpdateSellerDto } from '../../../interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class SellersService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/seller/';
    }

    getseller(id: string) {
        return this.get<SellerDto>({ apiName: `Get/${id}` });
    }

    getEditseller(id: string) {
        return this.get<SellerDto>({ apiName: `getedit/${id}` });
    }

    get Seller() {
        return this.get<SellerDto[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: AddSellerDto) {
        return this.post<AddSellerDto, AddSellerDto>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: UpdateSellerDto) {
        return this.put({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string) {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }
}
