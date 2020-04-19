import { Component, OnDestroy, OnInit } from '@angular/core'
import { combineLatest, Subscription } from 'rxjs'
import * as moment from 'moment'

import { Category } from '../shared/models/category.model'
import { APPEvent } from '../shared/models/event.model'
import { CategoriesService } from '../shared/services/categories.service'
import { EventsService } from '../shared/services/events.service'

@Component( {
  selector:    'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls:   [ './history-page.component.scss' ]
} )
export class HistoryPageComponent implements OnInit, OnDestroy {

  // флаг загрузки компонеента
  isLoaded        = false
  isFilterVisible = false
  //Переменная для отмены подпискм
  s1: Subscription

  categories: Category[]     = []
  events: APPEvent []        = []
  filteredEvents: APPEvent[] = []

  // Переменная для передачи данных в компонент графиков
  chartData = []

  //Инжектируем сервисы
  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    // Объединяем стримы
    this.s1 = combineLatest( [
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ] )
      //Подписываемся на стримы
      .subscribe( (data: [ Category[], APPEvent[] ]) => {
        // Вытягиваем данные из стримов
        this.categories = data[ 0 ]
        this.events     = data[ 1 ]
        // Вызываем копирование массива
        this.setOriginalEvents()
        // Вызываем подсчет data
        this.calculateChartData()
        // Меняем флаг, показывая что данные загружены
        this.isLoaded = true
      } )
  }

  private setOriginalEvents() {
    // Для того чтобы просто скопироватть массив
    // вызываем метод slice() без параметров
    this.filteredEvents = this.events.slice()
  }

  calculateChartData(): void {
    // Обнуляем массив
    this.chartData = []
    //Пробегаемся по массиву, и фильтруем категории
    this.categories.forEach( (cat) => {
      const catEvents = this.filteredEvents.filter(
        e => e.category === cat.id && e.type === 'outcome' )
      //Добавляем в массив отфильтрованные объекты
      this.chartData.push( {
        name:  cat.name,
        value: catEvents.reduce( (total, e) => {
          total += e.amount
          return total
        }, 0 )
      } )
    } )
  }

  toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir
  }

  openFilter() {
    this.toggleFilterVisibility( true )
  }

  onFilterApply(filterData) {
    // скрываем модальное окно
    this.toggleFilterVisibility( false )
    //Получаем список всех наших ивентов
    this.setOriginalEvents()

    const startPeriod = moment().startOf( filterData.period ).startOf( 'd' )
    const endPeriod   = moment().endOf( filterData.period ).endOf( 'd' )

    // console.log( 'filterData', filterData )

    this.filteredEvents = this.filteredEvents
                              .filter( (e) => {
                                // Если есть в массиве e.type то мы его покажем
                                return filterData.types.indexOf( e.type ) !== -1
                              } )
      // Первый фильтр вернет массив, у которого мы можем
      // снова вызвать метод фильтра
                              .filter( (e) => {
                                // Если в фильтр дате существуют те категории
                                // которые мы выбрали то мы будем их оставлять
                                // Стоит учесть что мы в filterData получаем у
                                // них id строковые а e.category получаем типа
                                // number. Поэтому чтобы было корректно мы
                                // вызвали метод toString()
                                return filterData.category.indexOf(
                                  e.category.toString() ) !== -1
                              } )
                              .filter( (e) => {
                                // Первым параметром передаем нашу дату
                                // Вторым параметром передаем формат в котором
                                // хранится наша дата
                                const momentDate = moment(
                                  e.date, 'DD.MM.YYYY HH:mm:ss' )
                                // isBeetween определяет находится ли дата в
                                // нужном промежутке
                                return momentDate.isBetween(
                                  startPeriod, endPeriod )
                              } )
    this.calculateChartData()

  }

  onFilterCancel() {
    // Закрываем окно нашего фильтра
    this.toggleFilterVisibility( false )
    // Копируем оригинальный массив
    this.setOriginalEvents()
    // Делаем перерисовку графика
    this.calculateChartData()
  }

  ngOnDestroy(): void {
    if( this.s1 ) this.s1.unsubscribe()
  }

}
