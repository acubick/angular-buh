import { Component, Input, OnInit } from '@angular/core'
import { Category } from '../../shared/models/category.model'
import { APPEvent } from '../../shared/models/event.model'

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = []
  @Input() events: APPEvent[]  = []
  searchValue = ''
  searchPlaceholder = 'Сумма'
  searchField = 'amount'

  constructor() { }

  ngOnInit(): void {
    // console.log('categories', this.categories)
    // console.log('events', this.events)
    this.events.forEach((e) => {
      //Ищем имя категории по id и возвращаем его
      e.catName = this.categories.find(c => c.id === e.category).name
    })

  }

  getEventClass(e: APPEvent) {
    //Определяем и возвращаем тип расход/доход
       return {
         'label': true,
         'label-danger': e.type === 'outcome',
         'label-success': e.type === 'income'
       }
  }

  changeCriteria(field: string){
    // Карта с названиями категорий
    const namesMap = {
      amount: 'Сумма',
      date:'Дата',
      category: 'Категория',
      type: 'Тип'
    }
    // Задаем значения  placeholder
    this.searchPlaceholder = namesMap[field]
    this.searchField = field

  }


}
