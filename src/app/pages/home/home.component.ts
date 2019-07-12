import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// Properties
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
  };
  // @ts-ignore
  @ViewChild('userForm') form: any;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit({value, valid}: { value: any, valid: boolean }) {
    this.user = value;
    console.log({value, valid});
  }
}
