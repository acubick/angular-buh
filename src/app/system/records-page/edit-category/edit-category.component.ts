import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Message } from '../../../shared/models/message.model'
import { Category } from '../../shared/models/category.model'
import { CategoriesService } from '../../shared/services/categories.service'

@Component( {
  selector:    'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls:   [ './edit-category.component.scss' ]
} )
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = []
  @Output() onCategoryEdit        = new EventEmitter<Category>()
  currentCategoryId               = 1
  currentCategory: Category
  message: Message

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.message = new Message( 'success', '' )
    // console.log( this.message )
    this.onCategoryChange()
  }

  onSubmit(form: NgForm) {

    //Забираем необходимые поля из формы
    let { capacity, name } = form.value
    // Проверяем на значение на валидность
    if( capacity < 0 ) capacity *= -1
    const category = new Category( name, capacity, +this.currentCategoryId )
    //Вызываем метод для обновления категории на сервере
    this.categoriesService.updateCategory( category )
        .subscribe( (category: Category) => {
          //После обновления категории на сервере, эмитим полученную категорию
          // в родительский компонент
          this.onCategoryEdit.emit( category )
          //выводим текст при успешном редактировании категории
          this.message.text = 'Категория успешно отредактирована'
          //Скрываем сообщение через 5 секунд
          window.setTimeout(() => this.message.text = '', 5000)
        } )

  }

  onCategoryChange() {
    this.currentCategory = this.categories
                               .find( c => c.id === +this.currentCategoryId )
  }
}
