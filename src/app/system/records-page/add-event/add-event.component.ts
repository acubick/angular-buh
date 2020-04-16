import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import * as moment from 'moment'
import { Subscription } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import { Message } from '../../../shared/models/message.model'
import { BillModel } from '../../shared/models/bill.model'
import { Category } from '../../shared/models/category.model'
import { APPEvent } from '../../shared/models/event.model'
import { BillService } from '../../shared/services/bill.service'
import { EventsService } from '../../shared/services/events.service'

@Component( {
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: [ './add-event.component.scss' ]
} )
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = []
  types                           = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ]

  message: Message
  sub1: Subscription
  sub2: Subscription

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.message = new Message('danger', '')
  }

  private showMessage(text: string){
    // Показываем текс
       this.message.text = text
    // Через 5 секунд убираем показ текста
    window.setTimeout(()=> this.message.text = '', 5000)
  }

  onSubmit(form: NgForm) {
    //Забираем необходимые поля
    let { amount, description, category, type } = form.value
    //Если amount отрицательный, то переводим его в положительный баланс
    if( amount < 0 ) amount *= -1
    //Создаем объект события
    const event = new APPEvent(
      type, amount, +category,
      moment().format( 'DD.MM.YYYY HH.mm.ss' ), description
    )
    //Получаем счет с сервера
    this.sub1 = this.billService.getBill()
      .subscribe((bill: BillModel)=>{
        let value = 0
          if(type === 'outcome'){
             if(amount > bill.value){
               // Показываем Ошибку
                this.showMessage(`На счету недостаточно средств. Вам нехватает ${amount - bill.value} руб.`)
               return
             } else {
               value = bill.value - amount
             }
          } else{
            //Складываем текущий наш счет + значение которое мы добавляем
              value = bill.value + amount
          }
          // Обновляем счет на сервере. Передаем объект bill
      this.sub2 =  this.billService.updateBill({value, currency: bill.currency})
            .pipe(
              // Используем mergeMap, чтобы не делать подписку 2 раза
              // Обращаемся к сервису создающему события на сервере
              mergeMap(() => this.eventsService.addEvent(event))
            )
            .subscribe( ()=>{
              // Очищаем форму. Присваиваем ей значения по умолчанию
              form.setValue({
                amount: 0,
                description: ' ',//Тут стоит пробел чтобы проходить валидацию
                category: 1,
                type: 'outcome'
              })
            })
      })
  }

  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe()
    if(this.sub2)this.sub2.unsubscribe()
  }
}
