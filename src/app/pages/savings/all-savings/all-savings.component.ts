import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-savings',
  templateUrl: './all-savings.component.html',
  styleUrls: ['./all-savings.component.scss']
})
export class AllSavingsComponent implements OnInit {
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartLabels = [
    'january',
    'february',
    'march',
    'april',
    'mai',
    'jun',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Savings 2019' }
  ];

  constructor() {}

  ngOnInit() {}
}
