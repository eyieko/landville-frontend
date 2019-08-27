import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/Client';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(
    private clientsServices: ClientsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.displayClients();
  }

  displayClients() {
    this.spinner.show();
    this.clientsServices.fetchClientCompanies().subscribe(
      response => {
        console.log(response, 'clients new');
        console.log(response.data, 'revamped ');
        this.clients = response.data.client_companies;

        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
}
