import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model'
import { CategoriesService } from '../shared/services/categories.service'

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = []
  isLoaded = false
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[])=>{
        this.categories = categories
        this.isLoaded = true
      })
  }

  newCategoryAdded(category: Category) {
      this.categories.push(category)
  }

  categoryWasEdited(category: Category) {
    //Ищем категорию с нужным индексом в массиве
    const idx = this.categories
                    .findIndex(c => c.id === category.id)
    //после того как индекс найден, мы присваиваем категории с этим индексом
    // значения категории которую получили
    this.categories[idx] = category

  }
}
