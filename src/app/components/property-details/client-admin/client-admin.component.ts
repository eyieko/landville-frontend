import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: [ './client-admin.component.scss' ]
})
export class ClientAdminComponent implements OnInit {
  @Input() clientName: string;
  @Input() clientStreet: string;
  @Input() clientState: string;
  @Input() clientCity: string;
  @Input() phone: string;
  @Input() email: string;

  constructor() {
  }

  ngOnInit() {
  }

}
