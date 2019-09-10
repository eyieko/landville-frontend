import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-saving',
  templateUrl: './single-saving.component.html',
  styleUrls: ['./single-saving.component.scss']
})
export class SingleSavingComponent implements OnInit {

  public doughnutChartLabels = ['january', 'february', 'march', 'april', 'mai', 'jun', 'july', 'august', 'september', 'october', 'november', 'december'];
  public doughnutChartData = [120, 150, 180, 90, 45, 32, 23, 23, 12, 14];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
