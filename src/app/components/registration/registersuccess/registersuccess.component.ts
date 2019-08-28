import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html',
  styleUrls: [ './registersuccess.component.scss' ]
})
export class RegistersuccessComponent implements OnInit {

  constructor(
    private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Registration Successful');
  }

}
