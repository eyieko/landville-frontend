import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: [ './error404.component.scss' ]
})
export class Error404Component implements OnInit {
  code = 404;
  codeTitle = 'PAGE NOT FOUND';
  codeDescription = 'The page you are looking for might have been removed, ' +
    'had its name changed or is temporarily unavailable.';
  redirectTo = '/';

  constructor() {
  }

  ngOnInit() {
  }

}
