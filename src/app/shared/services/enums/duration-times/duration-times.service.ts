import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class DurationTimesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/durationtimes/';
    }

    get durationTimes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
