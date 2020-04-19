import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Category } from '../../shared/models/category.model'

@Component( {
  selector:    'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls:   [ './history-filter.component.scss' ]
} )
export class HistoryFilterComponent {

  @Output() onFilterCancel        = new EventEmitter<any>()
  @Output() onFilterApply         = new EventEmitter<any>()
  @Input() categories: Category[] = []
  timePeriods                     = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' }
  ]
  selectedPeriod                  = 'd'
  selectedTypes                   = []
  selectedCategories              = []

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ]

  constructor() { }

  closeFilter() {
    this.selectedTypes = []
    this.selectedPeriod = 'd'
    this.selectedCategories = []
    this.onFilterCancel.emit()
    console.log( 'call method!' )
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    // Если мы нажали на чекбокс и выбрали его
    if( checked ) {
      // Проверяем есть ли он уже в нашем массиве  selectedTypes
      this[ field ].lastIndexOf( value ) === -1
        // Если его нет, то добавляем в массив
      ? this[ field ].push( value )
        // Иначе ничего не делае
      : null
    }
      // Если не checked, тогда делаем фильтрацию всех находящихся в нем
      // элементов
    // На всякий случай отфильтруем существующий value, если он там есть
    else {
      // Делаем фильтрацию, получаем элемент i и проверяем что i !== value
      // Таким образом будем избавляться от лишнего i
      // и у нас не будет повторения в нашем массиве
      this[ field ] = this[ field ].filter( i => i !== value )
    }
  }

  //checked value
  handleChangeType({ checked, value }) {

    this.calculateInputParams( 'selectedTypes', checked, value )
    /*    // Если мы нажали на чекбокс и выбрали его
        if( checked ) {
          // Проверяем есть ли он уже в нашем массиве  selectedTypes
          this.selectedTypes.lastIndexOf( value ) !== -1 ?
            // Если его нет, то добавляем в массив
          this.selectedTypes.push( value )
            // Иначе ничего не делаем
                                                         : null
        }
          // Если не checked, тогда делаем фильтрацию всех находящихся в нем
          // элементов
        // На всякий случай отфильтруем существующий value, если он там есть
        else {
          // Делаем фильтрацию, получаем элемент i и проверяем что i !== value
          // Таким образом будем избавляться от лишнего i
          // и у нас не будет повторения в нашем массиве
          this.selectedTypes = this.selectedTypes.filter( i => i !== value )
        }*/
  }

  handleChangeCategory({ checked, value }) {

    this.calculateInputParams( 'selectedCategories', checked, value )

    /* // Если мы нажали на чекбокс и выбрали его
     if( checked ) {
       // Проверяем есть ли он уже в нашем массиве  selectedTypes
       this.selectedCategories.lastIndexOf( value ) !== -1 ?
         // Если его нет, то добавляем в массив
       this.selectedCategories.push( value )
         // Иначе ничего не делаем
                                                      : null
     }
       // Если не checked, тогда делаем фильтрацию всех находящихся в нем
       // элементов
     // На всякий случай отфильтруем существующий value, если он там есть
     else {
       // Делаем фильтрацию, получаем элемент i и проверяем что i !== value
       // Таким образом будем избавляться от лишнего i
       // и у нас не будет повторения в нашем массиве
       this.selectedCategories = this.selectedCategories.filter( i => i !== value )
     }*/
  }

  applyFilter() {
    this.onFilterApply.emit( {
      types:    this.selectedTypes,
      category: this.selectedCategories,
      period:   this.selectedPeriod
    } )
  }
}
