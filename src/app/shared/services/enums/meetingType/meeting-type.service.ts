import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class MeetingTypeService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/meetingtypes/';
    }

    get meetingTypes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
