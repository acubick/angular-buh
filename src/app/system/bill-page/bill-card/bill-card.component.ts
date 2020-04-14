import { Component, Input, OnInit } from '@angular/core'
import { BillModel } from '../../shared/models/bill.model'

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel
  @Input() currency: any

  dollar: number
  euro: number
  rub: number

  constructor() { }

  ngOnInit(): void {
    const {rates} = this.currency
    this.dollar = this.bill.value / rates['RUB'] * rates['USD']
    this.euro =  this.bill.value /  rates['RUB']
    this.rub = rates['RUB']
    console.log( this.currency )
  }

}
