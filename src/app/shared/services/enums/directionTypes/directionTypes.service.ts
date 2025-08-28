import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class DirectionTypesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/directiontypes/';
    }

    get DirectionTypes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
