import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: [ './custom-error.component.scss' ]
})
export class CustomErrorComponent implements OnInit {
  @Input() code: number;
  @Input() codeTitle: string;
  @Input() codeDescription: string;
  @Input() redirectTo: string;
  @Input() buttonName: string;
  codeDescription1: string;
  codeDescription2: string;


  constructor() {
  }

  ngOnInit() {
    this.stringConverter();
  }

  stringConverter(): void {
    const descriptionList = this.codeDescription.match(/\b[-?(\w+)?]+\b/gi);
    this.codeDescription1 = descriptionList.slice(0, 10).join(' ');
    this.codeDescription2 = descriptionList.slice(10).join(' ');
  }
}
