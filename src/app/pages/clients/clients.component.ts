import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/Client';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { removeSubscription } from 'src/app/helpers/unsubscribe';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  subscribe: Subscription[] = [];

  constructor(
    private clientsServices: ClientsService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.displayClients();
  }

  displayClients() {
    this.spinner.show();
    this.clientsServices.fetchClientCompanies().subscribe(
      response => {
        this.clients = response.data.client_companies;
        this.spinner.hide();
      },
      err => {
        this.toastrService.error(err.errors.detail || err.errors);
        this.spinner.hide();
      }
    );
  }
  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
