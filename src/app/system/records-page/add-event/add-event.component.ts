import { Component, Input, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import * as moment from 'moment'

import { Category } from '../../shared/models/category.model'
import { APPEvent } from '../../shared/models/event.model'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = []
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    //Забираем необходимые поля
    let {amount, description, category, type} = form.value
    //Если amount отрицательный, то переводим его в положительный баланс
    if(amount < 0 ) amount *= -1
    //Создаем объект события
    const event = new APPEvent(
      type, amount, +category,
      moment().format('DD.MM.YYYY HH.mm.ss'), description
    )

  }
}
