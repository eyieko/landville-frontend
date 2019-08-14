import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imageMain: string;
  @Input() title: string;
  @Input() street: string;
  @Input() city: string;
  @Input() price: string;

  constructor() {}

  ngOnInit() {}
}
