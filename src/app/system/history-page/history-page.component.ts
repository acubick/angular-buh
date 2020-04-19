import { Component, OnDestroy, OnInit } from '@angular/core'
import { combineLatest, Subscription } from 'rxjs'
import { Category } from '../shared/models/category.model'
import { APPEvent } from '../shared/models/event.model'
import { CategoriesService } from '../shared/services/categories.service'
import { EventsService } from '../shared/services/events.service'

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  // флаг загрузки компонеента
  isLoaded = false
  isFilterVisible = false
  //Переменная для отмены подпискм
  s1: Subscription

  categories: Category[] = []
  events: APPEvent [] = []
  // Переменная для передачи данных в компонент графиков
  chartData = []
   //Инжектируем сервисы
  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    // Объединяем стримы
   this.s1 = combineLatest([
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ])
     //Подписываемся на стримы
     .subscribe((data:  [Category[], APPEvent[]])=>{
        // Вытягиваем данные из стримов
       this.categories = data[0]
       this.events = data[1]
       // Вызываем подсчет data
       this.calculateChartData()
       // Меняем флаг, показывая что данные загружены
       this.isLoaded = true
    })
  }

  calculateChartData(): void{
    // Обнуляем массив
   this.chartData = []
    //Пробегаемся по массиву, и фильтруем категории
    this.categories.forEach((cat) => {
      const catEvents =  this.events.filter( e => e.category === cat.id && e.type === 'outcome')
       //Добавляем в массив отфильтрованные объекты
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
             total += e.amount
          return total
        }, 0)
      })
    })
  }

  toggleFilterVisibility(dir: boolean){
     this.isFilterVisible = dir
  }

  openFilter() {
     this.toggleFilterVisibility(true)
  }

  onFilterApply(filterData) {
    console.log('filterData', filterData )
  }

  onFilterCancel() {
      this.toggleFilterVisibility(false)
  }


  ngOnDestroy(): void {
    if(this.s1) this.s1.unsubscribe()
  }


}
