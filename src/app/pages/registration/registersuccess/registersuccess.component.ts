import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html',
  styleUrls: ['./registersuccess.component.scss']
})
export class RegistersuccessComponent implements OnInit {

  constructor(
    private metaService: Meta,
    private titleService: Title) { }

  ngOnInit() {
      this.titleService.setTitle('Registration Successful');
  }

}
