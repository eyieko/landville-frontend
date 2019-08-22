import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-international-payment-status',
  templateUrl: './international-payment-status.component.html',
  styleUrls: ['./international-payment-status.component.scss']
})
export class InternationalPaymentStatusComponent implements OnInit {
  imgSrc: any;
  message: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.imgSrc = 'assets/img/ICON/' + params.status + '.png';
      this.message = params.message;
      console.log(this.imgSrc);
      console.log(this.message);
    });
  }

}
