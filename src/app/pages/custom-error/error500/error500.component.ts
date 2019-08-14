import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: [ './error500.component.scss' ]
})
export class Error500Component implements OnInit {
  code = 500;
  codeTitle = 'INTERNAL SERVER ERROR';
  codeDescription = 'Sorry Something went wrong on our end. We are currently working to fix the problem.';
  redirectTo = '/';
  buttonName = 'Go back to main page';

  constructor() {
  }

  ngOnInit() {
  }

}
