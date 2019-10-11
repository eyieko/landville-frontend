import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/savings/savings.service';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  result: any[] = [];
  buyers: any[] = [];
  buyersName: any = [];
  count: number;
  countBuyers: any = [];
  tryCount: any;
  newArr: any = [];

  // selectedYear: Date = new Date(2019, 9);
  date: Date = new Date();
  deposits: any[] = [];
  savingsInJan: any[] = [0];
  savingsInFeb: any[] = [0];
  savingsInMarch: any[] = [0];
  savingsInApp: any[] = [0];
  savingsInMai: any[] = [0];
  savingsInJun: any[] = [0];
  savingsInJuly: any[] = [0];
  savingsInAug: any[] = [0];
  savingsInSept: any[] = [0];
  savingsInOct: any[] = [0];
  savingsInNov: any[] = [0];
  savingsInDec: any[] = [0];

  sumSavingsInJan: number;
  sumSavingsInFeb: number;
  sumSavingsInMarch: number;
  sumSavingsInApp: number;
  sumSavingsInMai: number;
  sumSavingsInJun: number;
  sumSavingsInJuly: number;
  sumSavingsInAug: number;
  sumSavingsInSept: number;
  sumSavingsInOct: number;
  sumSavingsInNov: number;
  sumSavingsInDec: number;
  selectedYears: any = [];
  yearIsSelected: number;
  year: number;

  lineChartOptions: any;
  lineChartLabels: any[] = [];
  lineChartType: any;
  lineChartLegend: boolean;
  lineChartData: any[] = [];

  doughnutChartLabels: any[] = [];
  doughnutChartData: any[] = [];
  doughnutChartType: any;

  selectedBuyer: any[] = [];
  buyersDeposit: any[] = [];
  singleDate: Date = new Date();

  singleSavingsInJan: any[] = [0];
  singleSavingsInFeb: any[] = [0];
  singleSavingsInMarch: any[] = [0];
  singleSavingsInApp: any[] = [0];
  singleSavingsInMai: any[] = [0];
  singleSavingsInJun: any[] = [0];
  singleSavingsInJuly: any[] = [0];
  singleSavingsInAug: any[] = [0];
  singleSavingsInSept: any[] = [0];
  singleSavingsInOct: any[] = [0];
  singleSavingsInNov: any[] = [0];
  singleSavingsInDec: any[] = [0];

  sumSingleSavingsInJan: number;
  sumSingleSavingsInFeb: number;
  sumSingleSavingsInMarch: number;
  sumSingleSavingsInApp: number;
  sumSingleSavingsInMai: number;
  sumSingleSavingsInJun: number;
  sumSingleSavingsInJuly: number;
  sumSingleSavingsInAug: number;
  sumSingleSavingsInSept: number;
  sumSingleSavingsInOct: number;
  sumSingleSavingsInNov: number;
  sumSingleSavingsInDec: number;

  constructor(private savingsService: SavingsService) {}

  ngOnInit() {
    this.setSavings();
    this.selectedYears = [
      { id: 1, selectedYear: 2018 },
      { id: 2, selectedYear: 2019 },
      { id: 3, selectedYear: 2020 },
      { id: 4, selectedYear: 2021 },
      { id: 5, selectedYear: 2022 },
      { id: 6, selectedYear: 2023 },
      { id: 7, selectedYear: 2024 },
      { id: 8, selectedYear: 2025 }
    ];
    this.yearIsSelected = 2019;
    this.selectedYears.selectedYear = 2019;
  }

  setSavings() {
    this.savingsService.getSavings().subscribe(response => {
      this.result = response.data.transactions;
      console.log('again', this.result);
      this.result.map(transactions => {
        this.buyers.push(transactions.buyer);
        this.buyersName = [...new Set(this.buyers)];
        this.count = this.buyers.reduce(function(prev, current) {
          prev[current] = (prev[current] || 0) + 1;
          return prev;
        }, {});

        this.deposits = transactions.deposits;
        this.deposits.map(myDeposit => {
          this.date = new Date(myDeposit.date.replace(' ', 'T'));
          this.date.getMonth() === 0 &&
            (this.date.getFullYear() === this.selectedYears.selectedYear &&
              this.savingsInJan.push(myDeposit.amount));
          this.date.getMonth() === 1 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInFeb.push(myDeposit.amount);
          this.date.getMonth() === 2 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInMarch.push(myDeposit.amount);
          this.date.getMonth() === 3 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInApp.push(myDeposit.amount);
          this.date.getMonth() === 4 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInMai.push(myDeposit.amount);
          this.date.getMonth() === 5 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInJun.push(myDeposit.amount);
          this.date.getMonth() === 6 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInJuly.push(myDeposit.amount);
          this.date.getMonth() === 7 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInAug.push(myDeposit.amount);
          this.date.getMonth() === 8 &&
          this.date.getFullYear() == this.selectedYears.selectedYear
            ? this.savingsInSept.push(myDeposit.amount)
            : (this.savingsInSept = [0]);
          this.date.getMonth() === 9 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInOct.push(myDeposit.amount);
          this.date.getMonth() === 10 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInNov.push(myDeposit.amount);
          this.date.getMonth() === 11 &&
            this.date.getFullYear() === this.selectedYears.selectedYear &&
            this.savingsInDec.push(myDeposit.amount);

          //doughnut chart

          this.selectedBuyer = this.result.filter(
            user => user.buyer === 'tevinthuku@gmail.com'
          );
        });
      });
      function getSum(total, number) {
        return total + number;
      }
      this.sumSavingsInJan = this.savingsInJan.reduce(getSum);
      this.sumSavingsInFeb = this.savingsInFeb.reduce(getSum);
      this.sumSavingsInMarch = this.savingsInMarch.reduce(getSum);
      this.sumSavingsInApp = this.savingsInApp.reduce(getSum);
      this.sumSavingsInMai = this.savingsInMai.reduce(getSum);
      this.sumSavingsInJun = this.savingsInJun.reduce(getSum);
      this.sumSavingsInJuly = this.savingsInJuly.reduce(getSum);
      this.sumSavingsInAug = this.savingsInAug.reduce(getSum);
      this.sumSavingsInSept = this.savingsInSept.reduce(getSum);
      this.sumSavingsInOct = this.savingsInOct.reduce(getSum);
      this.sumSavingsInNov = this.savingsInNov.reduce(getSum);
      this.sumSavingsInDec = this.savingsInDec.reduce(getSum);

      this.lineChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };

      this.lineChartLabels = [
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
      this.lineChartType = 'line';
      this.lineChartLegend = true;
      this.lineChartData = [
        {
          data: [
            this.sumSavingsInJan,
            this.sumSavingsInFeb,
            this.sumSavingsInMarch,
            this.sumSavingsInApp,
            this.sumSavingsInMai,
            this.sumSavingsInJun,
            this.sumSavingsInJuly,
            this.sumSavingsInAug,
            this.sumSavingsInSept,
            this.sumSavingsInOct,
            this.sumSavingsInNov,
            this.sumSavingsInDec
          ],
          label: `Savings in ${this.yearIsSelected}`
        }
      ];

      console.log('this is it', this.selectedBuyer);

      this.doughnutChartLabels = [
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

      this.selectedBuyer.map(buyersData => {
        this.buyersDeposit = buyersData.deposits;
        console.log('gggggg', this.buyersDeposit);
        this.buyersDeposit.map(buyerDeposit => {
          this.singleDate = new Date(buyerDeposit.date.replace(' ', 'T'));
          this.singleDate.getMonth() === 0 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInJan.push(buyerDeposit.amount)
            : (this.singleSavingsInJan = [0]);
          this.singleDate.getMonth() === 1 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInFeb.push(buyerDeposit.amount)
            : (this.singleSavingsInFeb = [0]);
          this.singleDate.getMonth() === 2 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInMarch.push(buyerDeposit.amount)
            : (this.singleSavingsInMarch = [0]);
          this.singleDate.getMonth() === 3 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInApp.push(buyerDeposit.amount)
            : (this.singleSavingsInApp = [0]);
          this.singleDate.getMonth() === 4 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInMai.push(buyerDeposit.amount)
            : (this.singleSavingsInMai = [0]);
          this.singleDate.getMonth() === 5 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInJun.push(buyerDeposit.amount)
            : (this.singleSavingsInJun = [0]);
          this.singleDate.getMonth() === 6 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInJuly.push(buyerDeposit.amount)
            : (this.singleSavingsInJuly = [0]);
          this.singleDate.getMonth() === 7 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInAug.push(buyerDeposit.amount)
            : (this.singleSavingsInAug = [0]);
          this.singleDate.getMonth() === 8 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInSept.push(buyerDeposit.amount)
            : (this.singleSavingsInSept = [0]);
          this.singleDate.getMonth() === 9 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInOct.push(buyerDeposit.amount)
            : (this.singleSavingsInOct = [0]);
          this.singleDate.getMonth() === 10 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInNov.push(buyerDeposit.amount)
            : (this.singleSavingsInNov = [0]);
          this.singleDate.getMonth() === 11 &&
          this.singleDate.getFullYear() == this.selectedYears.selectedYear
            ? this.singleSavingsInDec.push(buyerDeposit.amount)
            : (this.singleSavingsInDec = [0]);
        });
      });

      this.sumSingleSavingsInJan = this.singleSavingsInJan.reduce(getSum);
      this.sumSingleSavingsInFeb = this.singleSavingsInFeb.reduce(getSum);
      this.sumSingleSavingsInMarch = this.singleSavingsInMarch.reduce(getSum);
      this.sumSingleSavingsInApp = this.singleSavingsInApp.reduce(getSum);
      this.sumSingleSavingsInMai = this.singleSavingsInMai.reduce(getSum);
      this.sumSingleSavingsInJun = this.singleSavingsInJun.reduce(getSum);
      this.sumSingleSavingsInJuly = this.singleSavingsInJuly.reduce(getSum);
      this.sumSingleSavingsInAug = this.singleSavingsInAug.reduce(getSum);
      this.sumSingleSavingsInSept = this.singleSavingsInSept.reduce(getSum);
      this.sumSingleSavingsInOct = this.singleSavingsInOct.reduce(getSum);
      this.sumSingleSavingsInNov = this.singleSavingsInNov.reduce(getSum);
      this.sumSingleSavingsInDec = this.singleSavingsInDec.reduce(getSum);
      console.log('single', this.sumSingleSavingsInJan);

      this.doughnutChartData = [
        this.sumSingleSavingsInJan,
        this.sumSingleSavingsInFeb,
        this.sumSingleSavingsInMarch,
        this.sumSingleSavingsInApp,
        this.sumSingleSavingsInMai,
        this.sumSingleSavingsInJun,
        this.sumSingleSavingsInJuly,
        this.sumSingleSavingsInAug,
        this.sumSingleSavingsInSept,
        this.sumSingleSavingsInOct,
        this.sumSingleSavingsInNov,
        this.sumSingleSavingsInDec
      ];
      this.doughnutChartType = 'doughnut';
    });
  }

  onYearSelected(val: any) {
    this.selectedYears.selectedYear = val;
    console.log('ddddd', this.selectedYears.selectedYear);
    this.setSavings();
  }
}
