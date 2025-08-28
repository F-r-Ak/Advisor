import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class VisitCasesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/visitcases/';
    }

    get visitCases() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
