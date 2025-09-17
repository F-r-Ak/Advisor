import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { EnumDto } from '../../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CategoryTypesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/categorytypes/';
    }

    get categoryTypes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
