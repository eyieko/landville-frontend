import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public hide;
  // constructor(private route: ActivatedRoute) {
  //   route.url.subscribe((url) => url.map(u => {
  //     console.log(u.path);
  //     if (u.path === '/login') {
  //       this.hide = true;
  //     }
  //     this.hide = false;
  //   }));
  // }
}

