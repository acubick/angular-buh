import { Component, OnDestroy, OnInit } from '@angular/core'
import { combineLatest, Subscription } from 'rxjs'
import { BillModel } from '../shared/models/bill.model'
import { BillService } from '../shared/services/bill.service'


@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  currency: any
  bill: BillModel

  isLoaded = false

  sub1: Subscription
  sub2: Subscription



  constructor(
    private billService: BillService
  ) { }

  ngOnInit(): void {
   this.sub1 = combineLatest(
     [
      this.billService.getBill(),
      this.billService.getCurrency()
     ]
    ).subscribe((data: [BillModel, any])=> {
     this.bill = data[0]
     this.currency = data[1]
     this.isLoaded = true
    })
  }

  ngOnDestroy(): void {
    if(this.sub1){
      this.sub1.unsubscribe()
    }
    if(this.sub2){
      this.sub2.unsubscribe()
    }

  }

  onRefresh() {
    this.isLoaded = false
    this.sub2 = this.billService.getCurrency()
        .subscribe((currency: any)=> {
          this.currency = currency
          this.isLoaded = true
        })
  }
}
