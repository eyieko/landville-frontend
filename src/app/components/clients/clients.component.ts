import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: [ './clients.component.scss' ]
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  subscribe: Subscription = new Subscription();

  constructor(
    private clientsServices: ClientsService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {
  }

  ngOnInit() {
    this.displayClients();
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags);
    });
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
    this.subscribe.unsubscribe();
  }
}
