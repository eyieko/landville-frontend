import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: [ './error403.component.scss' ]
})
export class Error403Component implements OnInit {
  code = 403;
  codeTitle = 'ACCESS DENIED/FORBIDDEN';
  codeDescription = 'You do not have permission to access this resource. That\'s all we know.';
  redirectTo = '/login';
  buttonName = 'Login';

  constructor() {
  }

  ngOnInit() {
  }

}
