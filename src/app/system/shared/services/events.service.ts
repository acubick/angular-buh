import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApi } from '../../../shared/core/base-api'
import { BillModel } from '../models/bill.model'
import { APPEvent } from '../models/event.model'

@Injectable()
export class EventsService extends BaseApi{
     constructor(public http: HttpClient) {
       super(http);
     }



     addEvent(event: APPEvent):Observable<APPEvent>{
       return  this.post('events', event)
     }

}
