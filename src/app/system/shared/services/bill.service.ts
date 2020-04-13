import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BillModel } from '../models/bill.model'

@Injectable()
export class BillService {
  API_KEY           = 'b3723b8aec8f03cb656f1171ce12d3ed'
  base              = 'USD'
  symbols           = 'RUB,EUR,USD'
  currencyServerURL = `http://data.fixer.io/api/latest?access_key=${ this.API_KEY }`

  constructor(private http: HttpClient) {}

  getBill(): Observable<BillModel> {
    return this.http.get<BillModel>( 'http://localhost:3000/bill' )

  }

  getCurrency(base: string = 'USD'):Observable<any> {
    return this.http.get(
      `${this.currencyServerURL}&symbols=${ this.symbols }` )

  }

}
