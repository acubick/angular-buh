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


  sub1: Subscription

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
      console.log(data)
    })
  }

  ngOnDestroy(): void {
    if(this.sub1){}
    this.sub1.unsubscribe()
  }

}
