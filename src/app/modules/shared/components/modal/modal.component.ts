import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-pictures',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input() images: [];
  @Input() mainImage: '';
  @Input() type: string;

  constructor() {}

  ngOnInit() {
  }
}
