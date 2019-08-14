import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: [ './error401.component.scss' ]
})
export class Error401Component implements OnInit {
  code = 401;
  codeTitle = 'UNAUTHORIZED';
  codeDescription = 'Access is allowed only to Registered users.';
  redirectTo = '/login';
  buttonName = 'Login';

  constructor() {
  }

  ngOnInit() {
  }

}
