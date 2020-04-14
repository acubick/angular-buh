import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BaseApi } from '../../../shared/core/base-api'
import { BillModel } from '../models/bill.model'

@Injectable()
export class BillService extends BaseApi{
  API_KEY           = 'b3723b8aec8f03cb656f1171ce12d3ed'
  base              = 'USD'
  symbols           = 'RUB,EUR,USD,UAH'
  currencyServerURL = `http://data.fixer.io/api/latest?access_key=${ this.API_KEY }`

  constructor(public http: HttpClient) {
    super(http)
  }

  // getBill(): Observable<BillModel> {
  //   return this.http.get<BillModel>( 'http://localhost:3000/bill' )
  //
  // }

  getBill(): Observable<BillModel> {
    return this.get('bill')
  }

  getCurrency(base: string = 'USD'):Observable<any> {
    return this.http.get(
      `${this.currencyServerURL}&symbols=${ this.symbols }` )

  }

}
