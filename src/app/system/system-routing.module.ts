import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BillPageComponent } from './bill-page/bill-page.component'
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component'
import { HistoryPageComponent } from './history-page/history-page.component'
import { PlanningPageComponent } from './planning-page/planning-page.component'
import { RecordsPageComponent } from './records-page/records-page.component'
import { SystemComponent } from './system.component'

const routes: Routes = [
  {path: 'system', component: SystemComponent, children:[
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'records', component: RecordsPageComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'history/:id', component: HistoryDetailComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {
}
