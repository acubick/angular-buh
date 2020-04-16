import { Component, OnDestroy, OnInit } from '@angular/core'
import { combineLatest, Observable, Subscription } from 'rxjs'


import { BillModel } from '../shared/models/bill.model'
import { Category } from '../shared/models/category.model'
import { APPEvent } from '../shared/models/event.model'
import { BillService } from '../shared/services/bill.service'
import { CategoriesService } from '../shared/services/categories.service'
import { EventsService } from '../shared/services/events.service'

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false


  bill: BillModel
  categories: Category[] = []
  events: APPEvent[] = []

  s1: Subscription

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
      // Синхронизируем получение данных с сервера
      // трех одновременных запросов
  this.s1 =  combineLatest([
      // Получаем общий счет
      this.billService.getBill(),
      // Получаем массив категорий
      this.categoriesService.getCategories(),
      // Получаем массив событий
      this.eventsService.getEvents()
    ]).subscribe((data: [BillModel, Category[], APPEvent[]]) => {
      // Вытаскиваем данные из объекта data
       this.bill = data[0]
       this.categories = data[1]
       this.events = data[2]
    // Разрешаем отображение блока
       this.isLoaded = true
    })
  }

  getCategoryCost(cat: Category): number{

    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome')
    return catEvents.reduce((total, e) => {
      // debugger
      total += e.amount
      return total
    }, 0)
  }

  private   getPercent(cat: Category): number{
    const percent = (100 * this.getCategoryCost(cat))  / cat.capacity
      return  percent > 100 ? 100 : percent
  }


  getCatPercent(cat: Category): string {
      return this.getPercent(cat) + '% '
  }

  getCatColorClass(cat:Category): string{
    const percent = this.getPercent(cat)
    return percent < 60 ? 'success ' : percent >= 100 ? 'danger' : 'warning'
  }


  ngOnDestroy(): void {
    if(this.s1) this.s1.unsubscribe()
  }

}
