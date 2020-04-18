import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import { Category } from '../../shared/models/category.model'
import { APPEvent } from '../../shared/models/event.model'
import { CategoriesService } from '../../shared/services/categories.service'
import { EventsService } from '../../shared/services/events.service'

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: APPEvent
  category: Category

  isLoaded = false
  s1: Subscription

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
   this.s1 = this.route.params
        .pipe(
          mergeMap((params: Params) => this.eventsService.getEventsById(params['id'])) ,
          mergeMap((event: APPEvent) => {
            this.event = event
            return this.categoriesService.getCategoryById(event.category)
          })
        )
        .subscribe((category: Category) => {
         this.category = category
          this.isLoaded = true
        })
  }

  ngOnDestroy(): void {
    if(this.s1) this.s1.unsubscribe()
  }

}
