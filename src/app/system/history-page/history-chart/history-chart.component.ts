import { Component, Input, OnInit } from '@angular/core'
import { NgxChartsModule } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

  @Input() data
  view: any[] = [745, 355]

  // options
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

}
